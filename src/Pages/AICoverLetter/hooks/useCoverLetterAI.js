// hooks/useCoverLetterAI.js
import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import pdfToText from "react-pdftotext";
import { serializePrompt } from "../util";
import promptJSON from "../promp.json";
import { v4 as uuidv4 } from "uuid";

export const useCoverLetterAI = (apiKey) => {
  // ---------------- state ----------------
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJDText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterModified, setCoverletterModified] = useState(false);
  const [jobInfo, setJobInfo] = useState({ company: "N/A", salary: "N/A", skills: [] });
  const [personalInfo, setPersonalInfo] = useState(null);

  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are an AI career assistant that answers based on user's resume and job description." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setchatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // fresh refs to avoid stale closures
  const historyRef = useRef(history);
  const selectedIdRef = useRef(selectedHistoryId);
  useEffect(() => { historyRef.current = history; }, [history]);
  useEffect(() => { selectedIdRef.current = selectedHistoryId; }, [selectedHistoryId]);

  const client = apiKey ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true }) : null;

  // ---------------- utils ----------------
  const persistHistory = (next) => sessionStorage.setItem("HISTORY_DATA", JSON.stringify(next));

  /** 保存“当前 UI 上的四类信息”到当前选中的 history 项，并持久化 */
  const saveAllInfo = () => {
    const id = selectedIdRef.current;
    if (!id) return;

    setHistory((prev) => {
      const updated = prev.map((e) =>
        e.id === id
          ? {
              ...e,
              resumeText,
              coverLetter,
              chatHistory,
              personalInfo
            }
          : e
      );
      persistHistory(updated);
      return updated;
    });
  };

  /** 切换当前选中 ID，并把该 history 项里的信息设置回 UI */
  const setAllInfo = (entry) => {
    if (!entry || !entry.id) return;
    setSelectedHistoryId(entry.id);
    sessionStorage.setItem("HISTORY_ID", entry.id);

    setResumeText(entry.resumeText ?? "");
    setCoverLetter(entry.coverLetter ?? "");
    setChatHistory(entry.chatHistory ?? []);
    setJDText(entry.jdText ?? "");
    setJobInfo({
      company: entry.company ?? "N/A",
      salary: entry.salary ?? "N/A",
      skills: entry.skills ?? []
    });
    if (entry.personalInfo) setPersonalInfo(entry.personalInfo);
    setCoverletterModified(false);
  };

  /** 编辑 cover letter：只更新 UI，并打脏标记 */
  const setCoverLetterSync = (newText) => {
    setCoverLetter(newText);
    setCoverletterModified(true);
  };

  /** 仅保存 cover letter 到当前 history（保留供书签快捷保存使用） */
  const saveNewCoverletter = () => {
    const id = selectedIdRef.current;
    if (!id) return;

    setHistory((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, coverLetter } : e));
      persistHistory(updated);
      return updated;
    });
    setCoverletterModified(false);
  };

  // ---------------- init from sessionStorage ----------------
  useEffect(() => {
    try {
      const pi = JSON.parse(sessionStorage.getItem("PERSONAL_INF"));
      if (pi) setPersonalInfo(pi);
    } catch {}

    const resume = sessionStorage.getItem("RESUME_TEXT");
    if (resume) setResumeText(resume);

    try {
      const historyData = JSON.parse(sessionStorage.getItem("HISTORY_DATA"));
      if (historyData) setHistory(historyData);

      const historyID = sessionStorage.getItem("HISTORY_ID");
      if (historyID && historyData?.length) {
        const found = historyData.find((e) => e.id === historyID);
        if (found) setAllInfo(found);
      }
    } catch {}
  }, []);

  // ---------------- PI / JD save (也写回当前 history) ----------------
  const savePersonalInfo = (piInfo) => {
    sessionStorage.setItem("PERSONAL_INF", JSON.stringify(piInfo));
    setPersonalInfo(piInfo);

    const id = selectedIdRef.current;
    if (!id) return;

    setHistory((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, personalInfo: piInfo } : e));
      persistHistory(updated);
      return updated;
    });
  };

  const saveJD = (jd) => {
    setJDText(jd);

    const id = selectedIdRef.current;
    if (!id) return;

    setHistory((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, jdText: jd } : e));
      persistHistory(updated);
      return updated;
    });
  };

  // ---------------- Resume upload ----------------
  const getPersonalInfoFromResume = async (text) => {
    if (!client) return null;
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are an AI that extracts structured personal information from resumes. Return strictly JSON." },
        { role: "user", content: `Extract name, email, phone, github, linkedin, website from this resume:\n\n${text}` }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "personal_info",
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              github: { type: "string" },
              linkedin: { type: "string" },
              website: { type: "string" }
            },
            required: ["name", "email"]
          }
        }
      }
    });

    const raw = response.choices[0].message;
    const content = raw?.parsed || raw?.content;
    return typeof content === "string" ? JSON.parse(content) : content;
  };

  const handleUploadResume = async (file) => {
    try {
      const text = await pdfToText(file);
      setResumeText(text);
      sessionStorage.setItem("RESUME_TEXT", text);

      if (!personalInfo) {
        const pi = await getPersonalInfoFromResume(text);
        if (pi) savePersonalInfo(pi);
      }
      // 上传后把新的 resume 写回当前 history
      saveAllInfo();
    } catch (err) {
      console.error("Failed to extract text from pdf", err);
    }
  };

  // ---------------- Generate cover letter ----------------
  const generateCoverLetter = async () => {
    if (!client) {
      alert("API Key missing");
      return;
    }

    const serializedInput = serializePrompt(promptJSON, jdText, resumeText, personalInfo);
    setLoading(true);

    try {
      // 先保存当前条目，避免丢失编辑/聊天
      saveAllInfo();

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: serializedInput }],
        temperature: 0.7,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "job_info",
            schema: {
              type: "object",
              properties: {
                company: { type: "string" },
                salary: { type: "string" },
                skills: { type: "array", items: { type: "string" } },
                coverLetter: { type: "string" }
              },
              required: ["company", "skills", "coverLetter"]
            }
          }
        }
      });

      const content = completion.choices[0].message.content || "{}";
      const parsed = JSON.parse(content);

      const newEntry = {
        id: uuidv4(),
        resumeText,
        jdText,
        ...parsed,
        chatHistory: [],
        personalInfo
      };

      setCoverLetter(parsed.coverLetter);
      setJobInfo({
        company: parsed.company,
        salary: parsed.salary,
        skills: parsed.skills,
      });

      setHistory((prev) => {
        const updated = [newEntry, ...prev];
        persistHistory(updated);
        return updated;
      });

      // 切换到新条目（内部会把数据写回 UI）
      setAllInfo(newEntry);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter. Check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Chat ----------------
  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    if (!client) {
      alert("Missing API key");
      return;
    }

    const newChat = [...chatHistory, { role: "user", content: chatInput }];
    setChatHistory(newChat);
    setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    const hiddenContext = {
      role: "system",
      content: `Here is the user's context. Resume:\n${resumeText}\n\nJob Description:\n${jdText}, the question I send is been asked by the compnay when I apply the job, please answer those questions after you do some research on the company, and job description and answer it based on my info from resume.`
    };

    const newMessages = [...messages, hiddenContext, { role: "user", content: chatInput }];
    setChatInput("");
    setchatLoading(true);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: newMessages,
        temperature: 0.7
      });

      const reply = completion.choices[0].message.content;
      const merged = [...newChat, { role: "assistant", content: reply }];

      setChatHistory(merged);
      setMessages((prev) => [...prev, { role: "user", content: chatInput }, { role: "assistant", content: reply }]);

      // 同步聊天记录到当前 history
      const id = selectedIdRef.current;
      if (id) {
        setHistory((prev) => {
          const updated = prev.map((e) => (e.id === id ? { ...e, chatHistory: merged } : e));
          persistHistory(updated);
          return updated;
        });
      }

      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch AI response. Check API key or network.");
    } finally {
      setchatLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ---------------- History switch ----------------
  const selectHistory = (entry) => {
    if (!entry?.id) return;
    saveAllInfo();
    setAllInfo(entry);
  };

  // ---------------- expose ----------------
  return {
    // data
    resumeText,
    jdText,
    coverLetter,
    jobInfo,
    personalInfo,
    history,
    selectedHistoryId,

    // flags
    loading,
    coverLetterModified,
    isLoading: loading || chatLoading,

    // actions
    saveJD,
    savePersonalInfo,
    handleUploadResume,
    generateCoverLetter,
    selectHistory,

    // editing helpers
    setCoverLetter: setCoverLetterSync, // 用同步版替代原始 set
    setCoverLetterSync,
    saveNewCoverletter,

    // new helpers you asked
    saveAllInfo,
    setAllInfo,

    // chat bundle
    chatObj: {
      chatHistory,
      sendMessage,
      handleKeyDown,
      chatLoading,
      chatInput,
      setChatInput,
      chatBottomRef
    }
  };
};

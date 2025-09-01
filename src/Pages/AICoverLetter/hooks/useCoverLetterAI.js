// hooks/useCoverLetterAI.js
import { useState, useEffect, useRef, useMemo } from "react";
import OpenAI from "openai";
import pdfToText from "react-pdftotext";
import { serializePrompt } from "../util";
import promptJSON from "../promp.json";
import { v4 as uuidv4 } from 'uuid';

export const useCoverLetterAI = (apiKey) => {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJDText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [jobInfo, setJobInfo] = useState({
    company: "N/A",
    salary: "N/A",
    skills: [],
  });
  const [personalInfo, setPersonalInfo] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // 用于展示的聊天内容
  const [messages, setMessages] = useState([
      { role: "system", content: "You are an AI career assistant that answers based on user's resume and job description." }
    ]);
  const [chatInput, setChatInput] = useState("");
  const [chatloading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    console.log('\x1b[31m%s\x1b[0m', 'WX - check - 1')
  }, [history])

  const client = apiKey
    ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
    : null;

  // 初始化 sessionStorage
  useEffect(() => {
    const pi = JSON.parse(sessionStorage.getItem("PERSONAL_INF"));
    if (pi) setPersonalInfo(pi);

    const resume = sessionStorage.getItem("RESUME_TEXT");
    if (resume) setResumeText(resume);

    const historyData = JSON.parse(sessionStorage.getItem("HISTORY_DATA"));
    if (historyData) setHistory(historyData);

    const historyID = sessionStorage.getItem("HISTORY_ID");
    if (historyID && historyData) {
      const entry = historyData.find(entry => entry.id === historyID);
      if (entry) selectHistory(entry)
    }
  }, []);

  const savePersonalInfo = (piInfo) => {
    sessionStorage.setItem("PERSONAL_INF", JSON.stringify(piInfo));
    setPersonalInfo(piInfo);
  };

  const saveJD = (jd) => setJDText(jd);

  // 从简历提取个人信息
  const getPersonalInfoFromResume = async (text) => {
    if (!client) return null;
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that extracts structured personal information from resumes. Return strictly JSON.",
        },
        {
          role: "user",
          content: `Extract name, email, phone, github, linkedin, website from this resume:\n\n${text}`,
        },
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
              website: { type: "string" },
            },
            required: ["name", "email"],
          },
        },
      },
    });

    const raw = response.choices[0].message;
    const content = raw?.parsed || raw?.content;
    return typeof content === "string" ? JSON.parse(content) : content;
  };

  // 上传简历
  const handleUploadResume = async (file) => {
    try {
      const text = await pdfToText(file);
      setResumeText(text);
      sessionStorage.setItem("RESUME_TEXT", text);

      if (!personalInfo) {
        const pi = await getPersonalInfoFromResume(text);
        savePersonalInfo(pi);
      }
    } catch (err) {
      console.error("Failed to extract text from pdf", err);
    }
  };

  // 生成 Cover Letter
  const generateCoverLetter = async () => {
    if (!client) {
      alert("API Key missing");
      return;
    }

    const serializedInput = serializePrompt(
      promptJSON,
      jdText,
      resumeText,
      personalInfo
    );

    setLoading(true);
    try {
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
                coverLetter: { type: "string" },
              },
              required: ["company", "skills", "coverLetter"],
            },
          },
        },
      });

      const content = completion.choices[0].message.content || "{}";
      const parsed = JSON.parse(content);

      const newEntry = {
        id: uuidv4(),
        resumeText,
        jdText,
        ...parsed,
      };

      setCoverLetter(parsed.coverLetter);
      setJobInfo({
        company: parsed.company,
        salary: parsed.salary,
        skills: parsed.skills,
      });

      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      sessionStorage.setItem("HISTORY_DATA", JSON.stringify(newHistory));
      sessionStorage.setItem("HISTORY_ID", newEntry.id);
      setSelectedHistoryId(newEntry.id);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter. Check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  // AI Chat
  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    if (!client) {
      alert("Missing API key");
      return;
    }

    // UI 聊天记录里只加用户输入的问题
    const newChatHistory = [...chatHistory, { role: "user", content: chatInput }];
    setChatHistory(newChatHistory);
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // 实际发给 API 的消息：在用户问题之前，插入一条隐藏的系统说明，包含 resume 和 JD
    const hiddenContext = {
      role: "system",
      content: `Here is the user's context. Resume:\n${resumeText}\n\nJob Description:\n${jdText}, the question I send is been asked by the compnay when I apply the job, please answer those questions after you do some research on the company, and job description and answer it based on my info from resume.`
    };

    const newMessages = [
      ...messages,
      hiddenContext,
      { role: "user", content: chatInput }
    ];

    setChatInput("");
    setChatLoading(true);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: newMessages,
        temperature: 0.7,
      });

      const reply = completion.choices[0].message.content;

      // 更新显示的聊天记录
      setChatHistory([...newChatHistory, { role: "assistant", content: reply }]);
      // 更新 messages 用于保持对话上下文（不包含隐藏上下文）
      setMessages([...messages, { role: "user", content: chatInput }, { role: "assistant", content: reply }]);

      // 滚动到底部
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch AI response. Check API key or network.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectHistory = (entry) => {
    setSelectedHistoryId(entry.id);
    sessionStorage.setItem("HISTORY_ID", entry.id);
    setCoverLetter(entry.coverLetter);
    setResumeText(entry.resumeText);
    setJDText(entry.jdText);
    setJobInfo({
      company: entry.company,
      salary: entry.salary,
      skills: entry.skills,
    });
  };

  return {
    resumeText,
    jdText,
    coverLetter,
    jobInfo,
    personalInfo,
    history,
    selectedHistoryId,
    loading,
    saveJD,
    savePersonalInfo,
    handleUploadResume,
    generateCoverLetter,
    selectHistory,
    setCoverLetter,
    chatObj: {
      chatHistory,
      sendMessage,
      handleKeyDown,
      chatloading,
      chatInput,
      setChatInput,
      chatBottomRef
    }
  };
};

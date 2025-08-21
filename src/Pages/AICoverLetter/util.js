/**
 * @param {Object} promptJSON - 你的 JSON prompt 对象
 * @param {string} jobDescription - 用户提供的 JD
 * @param {string} resume - 用户提供的 Resume
 * @returns {string} - 可发送给 OpenAI API 的完整字符串
 */
export function serializePrompt(promptJSON, jobDescription, resume, personalInfo) {
  console.log('\x1b[31m%s\x1b[0m', `WX - personalInfo ????: ${JSON.stringify(personalInfo)}`)
  const { instructions, goal, execution_steps, output_format } = promptJSON.prompt;

  // 拼接 execution steps
  const stepsText = execution_steps
    .map(step => {
      return `${step.step}:\n- ${step.details.join("\n- ")}`;
    })
    .join("\n\n");

  // 拼接完整 prompt
  const fullPrompt = `
    Instructions: ${instructions}

    Goal: ${goal}

    Execution Steps:
    ${stepsText}

    Input:
    Job Description: ${jobDescription}
    Resume: ${resume}
    Personal Info: ${JSON.stringify(personalInfo)}

    Expected Output:
    ${output_format.join("\n")}
    `;

  return fullPrompt.trim();
}

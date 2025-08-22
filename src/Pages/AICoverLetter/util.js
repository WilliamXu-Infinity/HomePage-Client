/**
 * @param {Object} promptJSON
 * @param {string} jobDescription
 * @param {string} resume
 * @returns {string}
 */
export function serializePrompt(promptJSON, jobDescription, resume, personalInfo) {
  const { instructions, goal, execution_steps, output_format } = promptJSON.prompt;

  const stepsText = execution_steps
    .map(step => {
      return `${step.step}:\n- ${step.details.join("\n- ")}`;
    })
    .join("\n\n");

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

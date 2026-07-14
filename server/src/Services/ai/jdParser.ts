import { groq } from '../../Config/grok.client';

import { JOB_JD_PARSER_INPUT_STRUCTURE } from '../../Constants/ai.Constants';

export const getJDParsed = (userInputMessage: string) => {
  const schemaStructure = JSON.stringify(
    JOB_JD_PARSER_INPUT_STRUCTURE,
    null,
    2
  );

  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a JSON generator.
          
                Return exactly one valid JSON object that matches the schema below.
                
                Schema:
                ${schemaStructure}
                
                Output MUST FOLLOW Rules:
                - Output ONLY raw JSON.
                - DO NOT wrap the output in Markdown code fences.
                - DO NOT include a language tag such as "json".
                - DO NOT add explanations, notes, comments, headings, or any text before or after the JSON.
                - The first character of your response must be "{".
                - The last character of your response must be "}".
                - The response must be valid JSON parsable by JSON.parse().
          
                Extraction Rules:
                - Extract ONLY information explicitly present in the job description.
                - Never infer, guess, or assume missing values.
                - If a field is missing:
                  - string → ''
                  - number → 0
                  - array → []
                `,
      },
      {
        role: 'user',
        content: userInputMessage,
      },
    ],
    // model: 'llama-3.1-8b-instant',
    // model: 'groq/compound',
    model: 'groq/compound-mini',
    temperature: 0.1,
    max_completion_tokens: 1024,
    top_p: 1,
    stop: null,
  });
};

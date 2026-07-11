import { getJDParsed } from './ai/jdParser';

export const aiService = {
  parseJD: async (jdUserInput: string) => {
    const response = await getJDParsed(jdUserInput);
    return response.choices[0]?.message?.content || '';
  },
};

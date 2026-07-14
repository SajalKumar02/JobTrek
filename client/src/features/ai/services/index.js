import http from '@/api';

const AIServices = {
  jdParser: async (jdText) => {
    try {
      const response = await http.post('/ai/jd-parser', {
        jdUserInput: jdText,
      });
      return response.data;
    } catch (error) {
      throw new Error('Could Not Fetch Job Description', { cause: error });
    }
  },
};

export default AIServices;

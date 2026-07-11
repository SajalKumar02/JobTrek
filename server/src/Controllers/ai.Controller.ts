import { aiService } from '../Services/ai.Services';

import { asyncHandler } from '../Utils/asyncHandler';

import { AIRequest, AIResponse } from '../Types';

import { aiJDInputValidator } from '../Validators/ai.Validator';
import { ApiError } from '../Utils/ApiError.Util';
import Groq from 'groq-sdk';

export const jdParser = asyncHandler(
  async (req: AIRequest, res: AIResponse) => {
    const { jdUserInput } = req.body;

    const validatorResult = aiJDInputValidator.safeParse({ jdUserInput });
    if (!validatorResult.success) {
      throw new ApiError(validatorResult.error.issues[0].message, 400);
    }

    try {
      const parsedJob = await aiService.parseJD(jdUserInput);
      const jsonResponse = JSON.parse(parsedJob);

      res.status(200).json({
        success: true,
        message: 'JD Parsed Successfully',
        jsonResponse,
      });
    } catch (err) {
      if (err instanceof Groq.APIError) {
        throw new ApiError(
          err.error.error.message || 'An error occurred while parsing the JD',
          500
        );
      } else {
        throw err;
      }
    }
  }
);

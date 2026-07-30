import Groq from 'groq-sdk';

import { aiService } from '../Services/ai.Services';

import {
  AIJDJobInput,
  AIResponseJobValidator,
} from '../Validators/ai.Validator';

import { asyncHandler } from '../Utils/asyncHandler';
import { ApiError } from '../Utils/ApiError.Util';

import { AIRequest, AIResponse } from '../Types';

export const jdParser = asyncHandler(
  async (req: AIRequest, res: AIResponse) => {
    const { jdUserInput } = req.body;

    const validatorResult = AIJDJobInput.safeParse({ jdUserInput });
    if (!validatorResult.success) {
      throw new ApiError(validatorResult.error.issues[0].message, 400);
    }

    try {
      const parsedJob = await aiService.parseJD(jdUserInput);
      const aiJsonResponse = JSON.parse(parsedJob);

      const validatorResult = AIResponseJobValidator.safeParse(aiJsonResponse);
      if (!validatorResult.success) {
        throw new ApiError(validatorResult.error.issues[0].message, 400);
      }

      res.status(200).json({
        success: true,
        message: 'JD Parsed Successfully',
        aiJsonResponse,
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

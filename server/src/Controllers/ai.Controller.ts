import { aiService } from '../Services/ai.Services';

import { asyncHandler } from '../Utils/asyncHandler';

import { AIRequest, AIResponse } from '../Types';

import { aiJDInputValidator } from '../Validators/ai.Validator';
import { ApiError } from '../Utils/ApiError.Util';

export const jdParser = asyncHandler(
  async (req: AIRequest, res: AIResponse) => {
    const { jdUserInput } = req.body;

    const validatorResult = aiJDInputValidator.safeParse({ jdUserInput });
    if (!validatorResult.success) {
      throw new ApiError(validatorResult.error.issues[0].message, 400);
    }

    let parsedJob;
    try {
      parsedJob = await aiService.parseJD(jdUserInput);
    } catch (error) {
      throw new ApiError(error.error?.error?.message, 500);
    }
    const jsonResponse = JSON.parse(parsedJob);

    res.status(200).json({
      success: true,
      message: 'JD Parsed Successfully',
      jsonResponse,
    });
  }
);

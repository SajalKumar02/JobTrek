import { Router } from 'express';

import { jdParser } from '../Controllers/ai.Controller';

const AIRouter = Router();

// prettier-ignore
AIRouter
    .post("/jd-parser", jdParser);

export default AIRouter;

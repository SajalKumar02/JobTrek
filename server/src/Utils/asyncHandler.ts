export const asyncHander = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        const status = (error as { status?: number }).status || 500;
        const message = (error as Error).message || "Internal server error";

        res.status(status).json({
            success: false,
            message: message
        })
    }
}
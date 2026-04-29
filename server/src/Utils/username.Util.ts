import { generateUsername, generateFromEmail } from "unique-username-generator";

export const generateUsernameForUser = async (): Promise<string> => {
    return generateUsername();
};

export const generateUsernameFromEmail = async (email: string): Promise<string> => {
    return generateFromEmail(email, { stripLeadingDigits: true });
}
import { generateUsername, generateFromEmail } from "unique-username-generator";

export const generateUsernameForUser = (): string => {
    return generateUsername();
};

export const generateUsernameFromEmail = (email: string): string => {
    return generateFromEmail(email, { stripLeadingDigits: true });
}
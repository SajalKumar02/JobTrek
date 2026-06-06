import { generateUsername } from 'unique-username-generator';

export const generateUsernameForUser = (): string => {
  return generateUsername();
};

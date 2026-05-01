import bcrypt from 'bcryptjs';

// accepting plain password
export const passwordHash = async (
  plainPassword: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(plainPassword, salt);
  // return hashed password
  return hashPassword;
};

export const comparePassword = async (hashedPassword: string, comparingPassword: string): Promise<boolean> => {
  if (await bcrypt.compare(comparingPassword, hashedPassword)) {
    return true;
  }
  return false;
}
// hashPassword()
// comparePassword()
import bcrypt from "bcryptjs";

// accepting plain password
export const passwordHash = async (plainPassword) => {
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  // return hashed password
  return hashPassword;
};

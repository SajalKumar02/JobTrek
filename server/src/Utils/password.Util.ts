import bcrypt from "bcryptjs";

// accepting plain password
export const passwordHash = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(plainPassword, salt);
    // return hashed password
    return hashPassword;
};

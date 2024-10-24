import bcrypt from "bcryptjs";
/**
 * @param {string} password
 * @param {number} salt
 */
export async function hashPassword(password: string, salt = 10) {
    return await bcrypt.hash(password, salt);
}
/**
 * @param {string} password
 * @param {string} hashedPassword
 */
export async function comparePasswords(
    password: string,
    hashedPassword: string
) {
    return await bcrypt.compare(password, hashedPassword);
}

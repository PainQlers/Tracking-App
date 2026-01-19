import users from "../data/user.mock.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (email, password) => {
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  };
};

import * as authService from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
};

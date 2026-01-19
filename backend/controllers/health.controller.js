export const check = async (req, res) => {
    try {
        res.status(200).json({
            status: "ok",
            message: "Backend is running 🚀"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
  };
}
  
import * as chartService from "../services/chart.service.js";

export const getSummary = async (req, res) => {
  try {
    const tracking = await chartService.getTrackingSummary();

    res.json(tracking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

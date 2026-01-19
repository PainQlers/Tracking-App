import * as trackingService from "../services/tracking.service.js";

export const getTrackings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await trackingService.getTrackings(userId, req.query);

    res.json({
      success: true,
      data: data.data,
      total: data.total,
      page: data.page,
      limit: data.limit,
    });
  } catch (err) {
    next(err);
  }
};

export const createTracking = async (req, res, next) => {
    try {
      const tracking = await trackingService.createTracking(
        req.user.userId,
        req.body
      );
  
      res.status(201).json(tracking);
    } catch (err) {
      next(err);
    }
  };

  
export const createVote = async (req, res, next) => {
    try {
      const vote = await trackingService.voteTracking(
        req.user.userId,     // user ที่ login
        req.params.id,       // trackingId
        req.body
      );
  
      res.status(201).json(vote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  export const updateTracking = async (req, res) => {
    try {
      const updatedTracking = await trackingService.updateTracking(
        req.user.userId,  // user ที่ login
        req.params.id,    // trackingId
        req.body
      );
  
      res.json(updatedTracking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

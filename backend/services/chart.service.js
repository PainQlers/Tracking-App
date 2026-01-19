import trackings from "../data/tracking.mock.js";
import votes from "../data/vote.mock.js";

export const getTrackingSummary = async () => {
  const userTrackings = trackings;

  const statusSummary = userTrackings.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const totalServiceFee = userTrackings.reduce(
    (sum, t) => sum + (t.serviceFee || 0),
    0
  );

  const averageRating =
    votes.length === 0
      ? 0
      : (
          votes.reduce((sum, v) => sum + v.rating, 0) /
          votes.length
        ).toFixed(1);

  return {
    totalTrackings: userTrackings.length,
    statusSummary,
    totalServiceFee,
    averageRating,
  };
};

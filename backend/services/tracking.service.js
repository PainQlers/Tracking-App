import trackings from "../data/tracking.mock.js";
import vote from "../data/vote.mock.js";

export const getTrackings = async (userId, query) => {
  let results = trackings;

  // 🔍 search (id or name)
  if (query.search) {
    results = results.filter(t =>
      t.id.toLowerCase().includes(query.search.toLowerCase()) ||
      t.name.toLowerCase().includes(query.search.toLowerCase())
    );
  }

  // 🎯 filter (status)
  if (query.status) {
    results = results.filter(t => t.status === query.status);
  }

  // ↕️ sort
  if (query.sortBy) {
    const order = query.order === "desc" ? -1 : 1;

    results.sort((a, b) => {
      if (a[query.sortBy] > b[query.sortBy]) return 1 * order;
      if (a[query.sortBy] < b[query.sortBy]) return -1 * order;
      return 0;
    });
  }

  // 📄 pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedResults = results.slice(startIndex, endIndex);

  // 🌟 Add rating data from votes
  const resultsWithRating = paginatedResults.map(tracking => {
    const trackingVote = vote.find(v => v.trackingId === tracking.id);
    return {
      ...tracking,
      rating: trackingVote ? trackingVote.rating : null,
    };
  });

  return {
    data: resultsWithRating,
    total: results.length,
    page,
    limit,
  };
};

export const createTracking = async (userId, data) => {
    // Generate sequential ID based on existing IDs
    const maxId = Math.max(...trackings.map(t => parseInt(t.id)), 0);
    const newId = (maxId + 1).toString();
    
    const newTracking = {
      id: newId,
      userId, // 👈 ผูกกับ user ที่ login
      name: data.name,
      status: "Created",
      orderTime: new Date().toISOString(),
      completedTime: "",
      serviceFee: data.serviceFee,
    };
  
    trackings.push(newTracking); // ✅ POST เข้า mock data
  
    return newTracking;
  };

  export const voteTracking = async (userId, trackingId, data) => {
    // 1️⃣ ตรวจว่า tracking มีจริงไหม
    const tracking = trackings.find(t => t.id === trackingId);
    if (!tracking) {
      throw new Error("Tracking not found");
    }
  
    // 2️⃣ ตรวจว่า user เคยโหวต tracking นี้แล้วหรือยัง
    const alreadyVoted = vote.find(
      v => v.userId === userId && v.trackingId === trackingId
    );
  
    if (alreadyVoted) {
      throw new Error("User has already voted this tracking");
    }
  
    // 3️⃣ ตรวจ rating
    const rating = Number(data.rating);
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
  
    // 4️⃣ สร้าง vote
    const newVote = {
      id: Date.now().toString(),
      userId,
      trackingId,
      trackingName: tracking.name,
      rating,
      createdAt: new Date().toISOString(),
    };
  
    vote.push(newVote);
  
    return newVote;
  };

  export const updateTracking = async (userId, trackingId, data) => {
    const tracking = trackings.find(t => t.id === trackingId);
  
    // 1️⃣ ตรวจว่ามี tracking ไหม
    if (!tracking) {
      throw new Error("Tracking not found");
    }
  
    // 2️⃣ ตรวจว่าเป็นของ user นี้ไหม
    if (tracking.userId !== userId) {
      throw new Error("Forbidden");
    }
  
    // 3️⃣ ตรวจ status
    if (tracking.status !== "Created") {
      throw new Error("Tracking cannot be edited when status is not created");
    }
  
    // 4️⃣ อนุญาตแก้ไขเฉพาะบาง field
    if (data.name !== undefined) {
      tracking.name = data.name;
    }
  
    if (data.serviceFee !== undefined) {
      tracking.serviceFee = data.serviceFee;
    }
  
    if (data.orderTime !== undefined) {
      tracking.orderTime = data.orderTime;
    }

    if (data.status !== undefined) {
        tracking.status = data.status;
    }
  
    return tracking;
  };

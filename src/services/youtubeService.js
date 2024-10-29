import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_KEY;

export const searchVideos = async (query) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 6,
          key: API_KEY,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error);
    throw error;
  }
};

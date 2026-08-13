import axios from 'axios';

const videoCache = {};

export const searchExerciseVideo = async (exerciseName) => {
  if (videoCache[exerciseName]) {
    return videoCache[exerciseName];
  }

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY') {
    throw new Error('MISSING_API_KEY');
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        maxResults: 1,
        q: `${exerciseName} proper form exercise`,
        key: apiKey,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      videoCache[exerciseName] = videoId;
      return videoId;
    } else {
      throw new Error('NO_VIDEO_FOUND');
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('QUOTA_EXCEEDED');
    }
    throw error;
  }
};

import React, { useState, useEffect } from 'react';
import { searchExerciseVideo } from '../../services/youtubeService';
import { Loader2 } from 'lucide-react';

export function ExerciseVideo({ exerciseName }) {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const id = await searchExerciseVideo(exerciseName);
        if (isMounted) setVideoId(id);
      } catch (err) {
        if (!isMounted) return;
        
        if (err.message === 'QUOTA_EXCEEDED') {
          setError('Unable to load exercise video. Please try again later.');
        } else if (err.message === 'NO_VIDEO_FOUND') {
          setError('No demonstration video found.');
        } else if (err.message === 'MISSING_API_KEY') {
          setError('API Key is missing. Please add VITE_YOUTUBE_API_KEY to your .env file.');
        } else {
          setError('An unexpected error occurred while fetching the video.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (exerciseName) {
      fetchVideo();
    }

    return () => {
      isMounted = false;
    };
  }, [exerciseName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[var(--color-bg-base)] rounded-xl border border-[var(--color-border)] aspect-video">
        <Loader2 className="animate-spin text-[var(--color-primary)] mb-3" size={32} />
        <p className="text-[var(--color-text-muted)] text-sm animate-pulse">Loading demonstration video...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-[var(--color-bg-base)] rounded-xl border border-[var(--color-border)] aspect-video text-center">
        <p className="text-[var(--color-accent-red)] text-sm">{error}</p>
      </div>
    );
  }

  if (videoId) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={`${exerciseName} Demonstration`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  }

  return null;
}

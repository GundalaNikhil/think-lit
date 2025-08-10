import { useState, useEffect } from "react";
import { Topic, TopicsResponse } from "@/types/topic";

interface UseTopicsReturn {
  topics: Topic[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTopics = (): UseTopicsReturn => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:1337/api/topics?populate=*"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TopicsResponse = await response.json();
      setTopics(data.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return {
    topics,
    loading,
    error,
    refetch: fetchTopics,
  };
};

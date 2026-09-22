"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export function useActivity() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivity = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/activity");

      if (!response.ok) {
        throw new Error("Failed to load activity");
      }

      const data = await response.json();

      setActivity(data);
    } catch {
      setError("Could not load activity.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const filteredActivity = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return activity;
    }

    return activity.filter((item) => {
      return (
        item.action?.toLowerCase().includes(normalizedQuery) ||
        item.info?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [activity, query]);

  return {
    activity: filteredActivity,
    query,
    setQuery,
    loading,
    error,
    reload: loadActivity,
  };
}

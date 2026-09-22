"use client";

import { useCallback, useEffect, useState } from "react";

import type { TasksSummary } from "@/types/api";
import { getErrorMessage, requestJson } from "@/lib/apiClient";

export function useReports() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await requestJson<TasksSummary>(
        "/api/reports/tasks-summary",
        {
          method: "GET",
        },
      );

      setSummary(data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load report summary."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    reload: fetchSummary,
  };
}

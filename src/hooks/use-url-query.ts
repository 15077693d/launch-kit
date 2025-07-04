"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUrlQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  const getQueryValue = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const clearQuery = useCallback(
    (key: string) => {
      updateQuery({ [key]: null });
    },
    [updateQuery],
  );

  return {
    updateQuery,
    getQueryValue,
    clearQuery,
    searchParams,
  };
}

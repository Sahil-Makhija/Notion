"use client";

import { useQueryClient } from "@tanstack/react-query";

export const useRevalidate = () => {
  const queryClient = useQueryClient();

  const revalidate = (args: string | string[]) => {
    if (Array.isArray(args)) {
      args.forEach((key) =>
        queryClient.invalidateQueries({
          queryKey: [key],
        }),
      );
    } else {
      queryClient.invalidateQueries({
        queryKey: [args],
      });
    }
  };

  return { revalidate };
};

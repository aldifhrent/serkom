import { axiosInstance } from "@/lib/axios";
import { Beasiswa } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBeasiswa = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<Beasiswa>(
        `/api/beasiswa/${id}`
      );

      return response.data;
    },
  });
};

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBeasiswa = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(
        `/api/beasiswa/${id}`
      );

      return response.data;
    },
  });
};

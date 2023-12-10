import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBeasiswa = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/api/beasiswa");

      return response.data;
    },
    queryKey: ["fetch.dashboard"],
  });
};

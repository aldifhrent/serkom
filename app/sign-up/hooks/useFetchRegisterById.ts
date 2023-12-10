import { axiosInstance } from "@/lib/axios";
import { Beasiswa } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const useFetchRegisterById = () => {
    return useMutation({
      mutationKey:['fetch-register-id'],
      mutationFn: async(id:string) => {
        try {
          const response = await axiosInstance.get<Beasiswa>(`/api/beasiswa/${id}`);
          return response.data;
  
        } catch (error) {
          console.log(error);
        }
      }
    })
  };
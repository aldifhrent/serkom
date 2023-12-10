import { useMutation } from '@tanstack/react-query';

import { Beasiswa } from '@prisma/client';
import { axiosInstance } from '@/lib/axios';

export const useEditBeasiswa = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<Beasiswa> }) => {
      const response = await axiosInstance.patch<Beasiswa>(`/api/beasiswa/${id}`, body);
      return response.data;
    },
  });
};

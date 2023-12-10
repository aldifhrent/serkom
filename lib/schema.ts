import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().min(1, {
    message: "Email is Required",
  }).email(),
  phoneNumber: z.string().min(1, {
    message: "Phone Number is Required"
  }).regex(/^\d+$/), 
  semester: z.string().min(1, { 
    message: "Semester is Required"
  }),
  ipk: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d{1,2})?$/)
    .refine((value) => parseFloat(value) >= 1 && parseFloat(value) <= 4, {
      message: "IPK should be in the range of 1 to 4.",
    }),
  tipeBeasiswa: z.string().min(1, {
    message: "Tipe Siswa is required",
  }),
  berkas: z.string().min(1, {
    message: "Berkas is required.",
  }),
  status: z.string().min(1),
});

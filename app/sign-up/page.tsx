"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateBeasiswa } from "./hooks/useCreateBeasiswa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formSchema } from "@/lib/schema";

const SignUpPage = () => {
  const router = useRouter();
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const { mutateAsync: createBeasiswa } = useCreateBeasiswa();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      semester: "",
      ipk: "",
      tipeBeasiswa: "",
      berkas: "",
      status: "Belum Verifikasi",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Set loading state
      const response = await createBeasiswa(values);

      toast.success("Success Register");
      router.push(`/sign-up/${response.id}`);
    } catch (error: any) {
      console.log(error);
    }

    console.log(values);
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full mb-12 mt-12 m-auto lg:max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {semesters.map((semester) => (
                            <SelectItem key={semester} value={semester}>
                              {semester}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ipk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IPK Terakhir</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="IPK"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipeBeasiswa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beasiswa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tipe Beasiswa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Akademik">Akademik</SelectItem>
                        <SelectItem value="Non Akademik">
                          Non Akademik
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="berkas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berkas</FormLabel>
                    <FormControl>
                      <input type="file" onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="items-center mx-auto">
                <Button type="submit">Register</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
};

export default SignUpPage;

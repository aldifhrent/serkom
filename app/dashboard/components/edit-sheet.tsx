import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formSchema } from "@/lib/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditBeasiswa, useFetchBeasiswaById } from "../hooks";
interface editSheetProps {
  id: string;
}
const EditSheet = ({ id }: editSheetProps) => {
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const fetchBeasiswaById = useFetchBeasiswaById();
  const editBeasiswa = useEditBeasiswa();
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
      status: "",
    },
  });
  async function fetchData(id: string) {
    try {
      const response = await fetchBeasiswaById.mutateAsync(id);

      if (response) {
        form.setValue("name", response.data.name);
        form.setValue("email", response.data.email);
        form.setValue("phoneNumber", response.data.phoneNumber);
        form.setValue("semester", response.data.semester);
        form.setValue("ipk", response.data.ipk);
        form.setValue("tipeBeasiswa", response.data.tipeBeasiswa);
        form.setValue("berkas", response.data.berkas);
        form.setValue("status", response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editBeasiswa.mutateAsync({ id: id, body: values });
      toast.success("Edit Success");
      window.location.reload();
    } catch (error) {
      toast.error('Error')
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="w-full h-full rounded-md  items-center p-4">
          <SheetHeader className="mb-8">
            <SheetTitle>Edit Profile</SheetTitle>
          </SheetHeader>
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
                      <Input placeholder="Phone Number" {...field} />
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
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem key={semester} value={semester}>
                              {semester}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                      <Input type="number" placeholder="IPK" {...field} />
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
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Beasiswa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Akademik">Akademik</SelectItem>
                          <SelectItem value="Non Akademik">
                            Non Akademik
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                    <FormControl></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beasiswa</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Belum Verifikasi">
                            Belum Verifikasi
                          </SelectItem>
                          <SelectItem value="Sudah Terverifikasi">
                            Sudah Terverifikasi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter className="items-center justify-center mx-auto">
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;

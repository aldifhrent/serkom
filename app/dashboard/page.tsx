"use client";
import { Beasiswa } from "@prisma/client";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, FileCheck } from "lucide-react";
import { useDeleteBeasiswa, useFetchBeasiswa } from "./hooks";
import EditSheet from "./components/edit-sheet";
import ActionTable from "./components/action-table";

const DashboardPage = () => {
  const { data: beasiswa, refetch } = useFetchBeasiswa();
  const { mutate: deleteBeasiswa } = useDeleteBeasiswa();

  const handleDelete = async (id: string) => {
    try {
        await deleteBeasiswa(id);
        toast.success(`Success Delete`);
        refetch();
    } catch (error) {
        console.error(error)
    }

  };
  return (
    <div className="max-w-7xl items-center justify-center mx-auto">
      <h1 className="text-center text-2xl font-bold">Dashboard Beasiswa</h1>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>IPK</TableHead>
            <TableHead>Beasiswa</TableHead>
            <TableHead>Berkas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beasiswa?.map((beasiswa: Beasiswa, index: number) => (
            <TableRow
              key={index}
              className="items-center text-center justify-center"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{beasiswa.name}</TableCell>
              <TableCell className="font-medium">{beasiswa.email}</TableCell>
              <TableCell className="font-medium">
                {beasiswa.phoneNumber}
              </TableCell>
              <TableCell className="font-medium">{beasiswa.semester}</TableCell>
              <TableCell className="font-medium">{beasiswa.ipk}</TableCell>
              <TableCell className="font-medium">
                {beasiswa.tipeBeasiswa}
              </TableCell>
              <TableCell className="font-medium">
                <a
                  href={beasiswa.berkas ? beasiswa.berkas : ""}
                  target="_blank"
                >
                  {beasiswa.berkas ? (
                    <FileCheck size={35} />
                  ) : (
                    <File size={35} />
                  )}
                </a>
              </TableCell>
              <TableCell className="font-medium">
                {beasiswa.status === "Belum Verifikasi" ? (
                  <span className="bg-red-700 rounded-md p-2 text-white">
                    {beasiswa.status}
                  </span>
                ) : (
                  <span className="bg-green-700 rounded-md p-2 text-white">
                    {beasiswa.status}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-x-2 items-center justify-center text-center">
                  <EditSheet id={beasiswa.id} />
                  <ActionTable
                    onClick={() => handleDelete(beasiswa.id)}
                    name="Delete"
                    variant="destructive"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardPage;

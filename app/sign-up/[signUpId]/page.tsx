"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck2 } from "lucide-react";
import React, { useEffect } from "react";
import { useFetchRegisterById } from "../hooks";

interface SignUpIdProps {
  params: {
    signUpId: string;
  };
}
// To do : Change to Mutation
const SignUpIdPage = ({ params }: SignUpIdProps) => {
  const beasiswa = useFetchRegisterById();
  useEffect(() => {
    async function fetchData() {
      beasiswa.mutate(params.signUpId);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden px-4">
      <div className="w-full mb-12 mt-12 m-auto lg:max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Hasil Registrasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            {beasiswa ? (
              <>
                <h1>Nama: {beasiswa.data?.name}</h1>
                <h1>Email: {beasiswa.data?.email}</h1>
                <h1>Phone Number: {beasiswa.data?.phoneNumber}</h1>
                <h1>Semester: {beasiswa.data?.semester}</h1>
                <h1>Tipe Beasiswa: {beasiswa.data?.tipeBeasiswa}</h1>
                <h1>
                  Berkas:
                  <span>
                    <a
                      href={beasiswa.data?.berkas}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="icon">
                        {" "}
                        <FileCheck2 values="10" />{" "}
                      </Button>
                    </a>
                  </span>
                </h1>
                <h1>Beasiswa: {beasiswa.data?.tipeBeasiswa}</h1>
                <h1>
                  Status:{" "}
                  {beasiswa.data?.status === "Belum Verifikasi" ? (
                    <span className="bg-red-700 rounded-md p-2 text-white">
                      {beasiswa.data?.status}
                    </span>
                  ) : (
                    <span className="bg-green-700 rounded-md p-2 text-white">
                      {beasiswa.data?.status}
                    </span>
                  )}
                </h1>
              </>
            ) : (
              <h1>Nothing</h1>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpIdPage;

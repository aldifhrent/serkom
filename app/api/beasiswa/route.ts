import prismaService from "@/lib/prisma-service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const beasiswa = await prismaService.beasiswa.findMany({

  });
  return NextResponse.json(beasiswa);
}

export const POST = async (req: NextRequest, filePath: any) => {
  try {
    const body = await req.json();
    
    const {name, email, phoneNumber, semester, ipk, tipeBeasiswa, berkas, status } = body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phoneNumber', 'semester', 'ipk', 'tipeBeasiswa', 'status'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(`${field} is Required`, { status: 403 });
      }
    }

    const existingEmail = await prismaService.beasiswa.findFirst({
      where: {
        email,
      }
    })
    const existingName = await prismaService.beasiswa.findFirst({
      where: {
        name,
      }
    })
    const existingPhoneNumber = await prismaService.beasiswa.findFirst({
      where: {
        phoneNumber,
      }
    })

    if(existingEmail) {
      return NextResponse.json('Email already exist', { status: 403})
    }
    if(existingName) {
      return NextResponse.json('Name already exist', { status: 403})
    }
    if(existingPhoneNumber) {
      return NextResponse.json('Phone Number already exist', { status: 403})
    }
    // Create data in Prismadb

    const beasiswa = await prismaService.beasiswa.create({
      data: {
        name,
        email,
        phoneNumber,
        semester,
        ipk,
        tipeBeasiswa,
        berkas,
        status,
      },
    });

    return NextResponse.json(beasiswa);
    // Error handling
  } catch (error) {
    console.error('ERROR', error);
    return NextResponse.json({ success: false, error: error });
  }
};


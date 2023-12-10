
import prismaService from '@/lib/prisma-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { beasiswaId: string} }) {
    try {
        if (!params.beasiswaId) {
            return new NextResponse("BeasiswaId is required", { status: 400 });
        }
        const beasiswa = await prismaService.beasiswa.findUnique({
            where: {
                id: params.beasiswaId, 
            }
        });

        return NextResponse.json(beasiswa);
    } catch (error) {
        console.error(error);
    }
}


export const PATCH = async (req: NextRequest, { params }: { params: { beasiswaId: string } }) => {
    if (!params.beasiswaId) {
        return new NextResponse("BeasiswaId is required", { status: 400 });
    }
    const body = await req.json();
    const { name, email, phoneNumber, semester, ipk, tipeBeasiswa, berkas, status } = body;
    
    const beasiswa = await prismaService.beasiswa.update({
        where: {
            id: params.beasiswaId
        },
        data: {
            name,
            email,
            phoneNumber,
            semester,
            ipk,
            tipeBeasiswa,
            berkas,
            status,
        }
    })

    return NextResponse.json(beasiswa)
}

export const DELETE = async (req: Request, { params }: { params: { beasiswaId: string } }) => {
    try {
        if (!params.beasiswaId) {
            return new NextResponse("BeasiswaId is required", { status: 400 });
        }
        const beasiswa = await prismaService.beasiswa.delete({
            where: {
                id: params.beasiswaId
            }
        })
        return NextResponse.json(beasiswa)
    } catch (error) {
        console.log(error);
    }
}

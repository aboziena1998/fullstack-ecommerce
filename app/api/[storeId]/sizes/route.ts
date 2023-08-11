import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;
    const { storeId } = params;

    if (!userId) {
      return new NextResponse('Unauthinticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!value) {
      return new NextResponse('ImageUrl is required', { status: 400 });
    }

    if (!storeId)
      return new NextResponse('StoreId is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const store = await prismadb.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[SIZE_POST]`, error);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = params;
  try {
    if (!storeId)
      return new NextResponse('StoreId is required', { status: 400 });

    const sizes = await prismadb.size.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log(`[SIZES_GET]`, error);
    return new NextResponse('internal error', { status: 500 });
  }
}

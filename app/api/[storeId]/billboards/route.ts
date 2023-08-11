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

    const { label, imageUrl } = body;
    const { storeId } = params;

    if (!userId) {
      return new NextResponse('Unauthinticated', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!imageUrl) {
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

    const store = await prismadb.billboard.create({
      data: {
        label,
        imgUrl: imageUrl,
        storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[BILLBOARD_POST]`, error);
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log(`[BILLBOARD_POST]`, error);
    return new NextResponse('internal error', { status: 500 });
  }
}

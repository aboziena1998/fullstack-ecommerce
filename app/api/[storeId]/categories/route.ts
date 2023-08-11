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

    const { name, billboardId } = body;
    const { storeId } = params;

    if (!userId) {
      return new NextResponse('Unauthinticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse('billbaord is required', { status: 400 });
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

    const store = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[CATEGORIES_POST]`, error);
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

    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log(`[CATEGORIES_GET]`, error);
    return new NextResponse('internal error', { status: 500 });
  }
}

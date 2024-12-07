import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { ApiErrorResponse } from "@/types/global";

export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const validatedData = AccountSchema.parse(body);

    const { provider, providerAccountId } = validatedData;

    const existingAccount = await Account.findOne({
      provider,
      providerAccountId,
    });
    if (existingAccount)
      throw new ForbiddenError(
        "An account already with the same provider already exists"
      );

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
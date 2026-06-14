import { NextResponse } from "next/server";

async function GET(req: Request) {
    return NextResponse.json("hello")
}
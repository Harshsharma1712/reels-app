import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {

    try {

        const { email, password, username } = await request.json()

        if (!email || !password || !username) {
            return NextResponse.json(
                { error: "Email, password and Username are required." },
                { status: 400 }
            )
        }

        await connectToDatabase()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered." },
                { status: 400 }
            )
        }

        const existingUsername = await User.findOne({username})

        if (existingUsername) {
            return NextResponse.json(
                { error: "Username already registered." },
                { status: 400 }
            )
        }
        
        await User.create( {email, password, username} )

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        )        

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to register user.", error },
            { status: 400 },
        )
    }

}
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { z } from 'zod'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = body.email;

        const emailSchema = z.string().email();
        const emailValidation = emailSchema.safeParse(email);

        if (!emailValidation.success) {
            return NextResponse.json({
                message: "Invalid email"
            }, {
                status: 400 // bad request
            })
        }

        const alreadyRegistered = await prismaClient.waitList.findUnique({
            where: { email }
        })

        if (alreadyRegistered) {
            return NextResponse.json({
                message: "you have already joined our list"
            }, {
                status: 200
            })
        }

        await prismaClient.waitList.create({
            data: {
                email
            }
        })

        return NextResponse.json({
            message: "you are on the list"
        }, {
            status: 201
        })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "server down, please try again later"
        }, {
            status: 500
        })
    }
}

export async function GET(request: NextRequest) {

    // get list of users in waitlist
    try {
        const count = await prismaClient.waitList.count();
        return NextResponse.json({
            count: count
        })
    } catch (err) {
        console.log(err);
    }
}
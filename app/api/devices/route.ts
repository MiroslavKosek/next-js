import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const devices = await prisma.device.findMany({
    select: {
      id: true,
      serial_number: true,
      product_id: true,
      createdAt: true
    },
  });
  return new Response(JSON.stringify(devices), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json()
  const user = await prisma.device.create({
    data: {
        serial_number: body.serial_number,
        product_id: body.product_id
    },
  });
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(req: Request, res: NextApiResponse) {
  const body = await req.json()
  const device = await prisma.device.delete({
    where: { id: body.id}
  });
  return new Response(
    JSON.stringify({
      message: "Device deleted",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return new Response(JSON.stringify({
    message: "Hello",
  }),
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
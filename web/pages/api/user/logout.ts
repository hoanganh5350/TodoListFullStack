import type { NextApiRequest, NextApiResponse } from "next";

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await res.setHeader("Set-Cookie", [
        `Access_token=""; Max-Age=0; Path=/; HttpOnly`,
        `user_id=""; Max-Age=0; Path=/; HttpOnly`,
      ]);
      res.status(200).json({ message: `Success Logout` });
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default Logout;

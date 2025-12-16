import { Request, Response } from "express";

const redirectToGoogle = (req: Request, res: Response) => {
  const auth = req.auth();
  const userId = auth.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    access_type: "offline",
    prompt: "consent",
    state: userId,
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};
export default redirectToGoogle;

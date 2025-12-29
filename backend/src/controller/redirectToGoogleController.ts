import { Request, Response } from "express";

const redirectToGoogle = (req: Request, res: Response) => {
  const auth = req.auth();
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/calendar.events",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: scopes,
    access_type: "offline",
    prompt: "consent",
    state: userId,
  });

  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
};

export default redirectToGoogle;

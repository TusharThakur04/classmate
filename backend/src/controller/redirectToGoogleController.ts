import { Request, Response } from "express";

const redirectToGoogle = (req: Request, res: Response) => {
  const auth = req.auth();

  if ("userId" in auth && auth.userId) {
    const userId = auth.userId;

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
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default redirectToGoogle;

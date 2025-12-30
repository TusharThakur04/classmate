import axios from "axios";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import storeHistoryId from "../utils/storeHistrotyId.js";

const oAuth = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const code = req.query.code as string;
  const userId = req.query.state as string;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  try {
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, expires_in } = tokenRes.data;

    console.log({ access_token, refresh_token, expires_in });

    await prisma.gmailAuth.upsert({
      where: { userId },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
      create: {
        userId,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
    });

    const history = await axios.get(
      "https://www.googleapis.com/gmail/v1/users/me/profile",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // storing historyId to always create flow for latest emails

    const historyId = history.data.historyId;

    await storeHistoryId(userId, historyId);

    res.redirect(`${process.env.FRONTEND_URL}/createFlow`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OAuth failed" });
  }
};

export default oAuth;

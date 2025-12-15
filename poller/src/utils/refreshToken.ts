import axios from "axios";

async function refreshAccessToken(refreshToken: any) {
  const res = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return {
    accessToken: res.data.access_token,
    expiresAt: new Date(Date.now() + res.data.expires_in * 1000),
  };
}
export default refreshAccessToken;

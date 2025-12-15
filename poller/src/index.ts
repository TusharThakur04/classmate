import "dotenv/config";
import cron from "node-cron";
import refreshAccessToken from "./utils/refreshToken.js";
import fetchOAuthlData from "./utils/fetchOAuthData.js";
import callGmailAPI from "./utils/callGmailAPI.js";
import updateDB from "./utils/updateDB.js";

const task = cron.schedule("* * * * *", async () => {
  const oAuthData = await fetchOAuthlData();

  if (!oAuthData || oAuthData.length === 0) {
    console.log("No OAuth data found.");
    return;
  }

  // console.log("Polling Dataaaaaaa:", oAuthData);

  for (const auth of oAuthData) {
    let accessToken = auth.accessToken;
    const from = auth.from;

    // refresh token if expired

    if (auth.expiresAt && new Date() >= new Date(auth.expiresAt)) {
      console.log("Access token expired, refreshing...");

      const newTokens = await refreshAccessToken(auth.refreshToken);
      accessToken = newTokens.accessToken;

      // update tokens in database

      updateDB(auth.refreshToken, newTokens);
    }

    if (accessToken) {
      try {
        const gmailData = await callGmailAPI(accessToken, from);
        console.log("Gmail Data:", gmailData);
      } catch (error) {
        console.error("Error fetching Gmail data:", error);
      }
    }
  }
});

task.start();

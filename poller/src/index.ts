import "dotenv/config";
import cron from "node-cron";
import refreshAccessToken from "./utils/refreshToken.js";
import fetchOAuthlData from "./utils/fetchOAuthData.js";
import callGmailAPI from "./utils/callGmailAPI.js";
import updateAccessToken from "./utils/updateAccessToken.js";
import makeRequestToHooksServer from "./utils/makeRequestToHookServer.js";

const task = cron.schedule("  * * * * *", async () => {
  const oAuthData = await fetchOAuthlData();

  if (!oAuthData || oAuthData.length === 0) {
    console.log("No OAuth data found.");
    return;
  }

  // console.log("Polling Dataaaaaaa:", oAuthData);

  for (const auth of oAuthData) {
    let accessToken = auth.accessToken;
    const from = auth.from;
    const historyId = auth.historyId;
    const userId = auth.userId;
    const flowId = auth.flowId;

    // refresh token if expired

    if (auth.expiresAt && new Date() >= new Date(auth.expiresAt)) {
      console.log("Access token expired, refreshing...");

      const newTokens = await refreshAccessToken(auth.refreshToken);
      accessToken = newTokens.accessToken;

      // update tokens in database

      updateAccessToken(auth.refreshToken, newTokens);
    }

    if (accessToken) {
      try {
        const mailIds = await callGmailAPI(accessToken, from, historyId);

        if (mailIds.length > 0) {
          mailIds.forEach(async (id) => {
            await makeRequestToHooksServer(id, flowId, userId);
          });
        }
      } catch (error) {
        console.error("Error fetching Gmail data:", error);
      }
    }
  }
});

task.start();

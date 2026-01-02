import axios from "axios";
import { ActionHandler } from "../dto/FlowData.js";
import refreshAccessToken from "../utils/refreshToken.js";
import updateAccessToken from "../utils/updataDB.js";
import extractBody from "../utils/extractMailBody.js";
import extractDeadline from "../utils/extractDeadline.js";

type SetReminderMetadata = {
  mailId: string;
};

const SetReminder: ActionHandler = async (ctx) => {
  const { mailId } = ctx.metadata as SetReminderMetadata;
  const gmailAuth = ctx.gmailAuth;

  let accessToken = gmailAuth.accessToken;

  // checking access token and refreshing if required

  if (gmailAuth.expiresAt && new Date() >= new Date(gmailAuth.expiresAt)) {
    const newTokens = await refreshAccessToken(gmailAuth.refreshToken);
    accessToken = newTokens.accessToken;

    await updateAccessToken(gmailAuth.refreshToken, newTokens);
  }

  //calling gmail api to get mail message body

  const res = await axios.get(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${mailId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        format: "full",
      },
    }
  );

  //extracting message body out of message payload

  const payload = res.data.payload;

  const message = extractBody(payload);

  if (message) {
    console.log("message---", message);

    const start = new Date().toISOString();

    // extracting deadlline from message body

    const deadline = await extractDeadline(message);

    if (deadline === null) {
      console.log("no deadline was found");
      return;
    }

    console.log("submission deadline---", deadline);

    const end = deadline;

    await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        summary: "assignment",
        description: "",
        start: {
          dateTime: start,
        },
        end: {
          dateTime: end,
        },

        //reminders on day before and 30 mins before

        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 30 },
            { method: "popup", minutes: 1440 },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Calendar reminder created:");
  }
};

export default SetReminder;

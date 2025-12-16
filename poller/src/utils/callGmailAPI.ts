import axios from "axios";
import updateHistoryId from "./updateHistoryId.js";
const callGmailAPI = async (
  accessToken: string,
  from: string,
  historyId: string
) => {
  const res = await axios.get(
    "https://gmail.googleapis.com/gmail/v1/users/me/history",
    {
      params: {
        startHistoryId: historyId,
        historyTypes: "messageAdded",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const newHistoryId = res.data.historyId;

  if (newHistoryId !== historyId) {
    // store new historyId

    await updateHistoryId(newHistoryId, accessToken);

    // const newMails = res.data.history;

    const newMailIds = res.data.history.flatMap((h: any) =>
      (h.messagesAdded || []).map((m: any) => m.message.id)
    );

    // console.log("new mail ids--", newMailIds);

    // console.log("newMsg:", newMsg);

    const allMailsFromSender = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=from:${from}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const senderMailsIds = allMailsFromSender.data.messages.map(
      (msg: any) => msg.id
    );
    // console.log("new main ids from sender --", senderMailsIds);

    // checking if new msg ids contains msg ids from sender

    const newMailSet = new Set(newMailIds);

    const mailIds: string[] = [];

    for (const id of senderMailsIds) {
      if (newMailSet.has(id)) {
        mailIds.push(id);
      }
    }
    console.log(mailIds);
  }

  return;
};

export default callGmailAPI;

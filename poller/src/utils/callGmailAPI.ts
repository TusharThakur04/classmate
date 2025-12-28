import axios from "axios";
import updateHistoryId from "./updateHistoryId.js";

const callGmailAPI = async (
  accessToken: string,
  from: string,
  historyId: string
): Promise<string[]> => {
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

  if (newHistoryId === historyId) {
    console.log("no new mails from the selected sender");
    return [];
  }

  const history = res.data.history ?? [];

  const newMailIds = history.flatMap((h: any) =>
    (h.messagesAdded ?? []).map((m: any) => m.message.id)
  );

  if (newMailIds.length === 0) {
    // still update to avoid infinite polling
    await updateHistoryId(newHistoryId, accessToken);
    return [];
  }

  console.log("new mail ids--", newMailIds);

  const senderRes = await axios.get(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages",
    {
      params: {
        q: `from:${from} newer_than:1d`,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const senderMailsIds: string[] =
    senderRes.data.messages?.map((msg: any) => msg.id) ?? [];

  const newMailSet = new Set(newMailIds);

  const mailIds = senderMailsIds.filter((id) => newMailSet.has(id));

  console.log("new mailIds from sender", mailIds);

  await updateHistoryId(newHistoryId, accessToken);

  return mailIds;
};

export default callGmailAPI;

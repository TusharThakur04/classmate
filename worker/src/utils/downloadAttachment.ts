import axios from "axios";

export const downloadAttachment = async (
  accessToken: string,
  messageId: string,
  attachmentId: string
): Promise<Buffer> => {
  const res = await axios.get(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const base64Data = res.data.data.replace(/-/g, "+").replace(/_/g, "/"); //base46url to base64

  return Buffer.from(base64Data, "base64");
};

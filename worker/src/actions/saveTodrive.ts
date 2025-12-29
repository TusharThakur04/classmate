import axios from "axios";
import { ActionHandler } from "../dto/FlowData.js";
import refreshAccessToken from "../utils/refreshToken.js";
import updateAccessToken from "../utils/updataDB.js";
import extractAttachments from "../utils/attachementExtraction.js";
import { downloadAttachment } from "../utils/downloadAttachment.js";
import { uploadToDrive } from "../utils/uploadToDrive.js";

type SaveToDriveMetadata = {
  mailId: string;
};

const SaveToDrive: ActionHandler = async (ctx, config) => {
  try {
    const metadata = ctx.metadata;
    const gmailAuth = ctx.gmailAuth;
    let accessToken = ctx.gmailAuth?.accessToken;
    const { mailId } = metadata as SaveToDriveMetadata;

    console.log("fetching mail attachments to save in drive");

    //checking access token

    if (gmailAuth.expiresAt && new Date() >= new Date(gmailAuth.expiresAt)) {
      console.log("Access token expired, refreshing...");

      const newTokens = await refreshAccessToken(gmailAuth.refreshToken);
      accessToken = newTokens.accessToken;

      //update db

      await updateAccessToken(gmailAuth.refreshToken, newTokens);
    }

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

    const attachments = extractAttachments(res.data.payload); //extracting attachment

    if (attachments.length === 0) {
      console.log("No attachments found");
      return;
    }

    for (const att of attachments) {
      console.log(
        "Attachment name:",
        att.filename,
        "\n",
        "id:",
        att.attachmentId
      );
      const buffer = await downloadAttachment(
        accessToken,
        mailId,
        att.attachmentId
      );

      await uploadToDrive(accessToken, att.filename, buffer, att.mimeType);

      console.log("Uploaded to Drive:", att.filename);
    }

    return;
  } catch (err) {
    throw err;
  }
};

export default SaveToDrive;

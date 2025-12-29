type Attachment = {
  filename: string;
  attachmentId: string;
  mimeType: string;
};

const extractAttachments = (payload: any): Attachment[] => {
  const attachments: Attachment[] = [];

  const walk = (parts: any[] = []) => {
    for (const part of parts) {
      if (part.filename && part.body?.attachmentId) {
        attachments.push({
          filename: part.filename,
          attachmentId: part.body.attachmentId,
          mimeType: part.mimeType,
        });
      }

      if (part.parts) {
        walk(part.parts);
      }
    }
  };

  walk(payload.parts);
  return attachments;
};

export default extractAttachments;

import axios from "axios";
import FormData from "form-data";

export const uploadToDrive = async (
  accessToken: string,
  fileName: string,
  fileBuffer: Buffer,
  mimeType = "application/octet-stream"
) => {
  const form = new FormData();

  form.append("metadata", JSON.stringify({ name: fileName }), {
    contentType: "application/json",
  });

  form.append("file", fileBuffer, { contentType: mimeType });

  await axios.post(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    form,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...form.getHeaders(),
      },
    }
  );
};

const extractBody = (payload: any): string | undefined => {
  let text: string | undefined;

  function traverse(part: any) {
    if (!part) return;

    if (part.mimeType === "text/plain" && part.body?.data) {
      const base64 = part.body.data.replace(/-/g, "+").replace(/_/g, "/");
      text = Buffer.from(base64, "base64").toString("utf-8");
    }

    if (part.parts) {
      for (const p of part.parts) {
        traverse(p);
      }
    }
    return text;
  }

  text = traverse(payload);
  return text;
};

export default extractBody;

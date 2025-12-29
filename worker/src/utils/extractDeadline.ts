import { isUnexpected } from "@azure-rest/ai-inference";
import client from "../lib/ModelClient.js";

const model = "meta/Llama-4-Scout-17B-16E-Instruct";
const extractDeadline = async (
  message: string
): Promise<string | undefined> => {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. You will be given text containing a submission date. Extract the date and return ONLY a valid ISO 8601 string in UTC.If there is no deadline in the message return no deadline",
          },

          {
            role: "user",
            content: "The submission date is 29 Dec 2025",
          },
          {
            role: "assistant",
            content: "2025-12-29T00:00:00.000Z",
          },

          {
            role: "user",
            content: "Submit before 29-12-2025 at 1:30 PM",
          },
          {
            role: "assistant",
            content: "2025-12-29T13:30:00.000Z",
          },
          { role: "user", content: "submit the assignment" },
          {
            role: "assistant",
            content: "no deadline",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    if (response.body.choices[0].message.content === null) {
      throw new Error("error while return response");
    }

    const deadline = response.body.choices[0].message.content;
    console.log("deadline---", deadline);
    return deadline.length > 0 ? deadline : undefined;
  } catch (err) {
    console.log("error--", err);
    return undefined;
  }
};

export default extractDeadline;

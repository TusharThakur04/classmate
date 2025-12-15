import axios from "axios";

const callGmailAPI = async (accessToken: string) => {
  const response = await fetch(
    "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Gmail API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
export default callGmailAPI;

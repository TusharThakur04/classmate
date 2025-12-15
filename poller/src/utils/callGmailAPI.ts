const callGmailAPI = async (accessToken: string, from: string) => {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=from:${from}`,
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

import axios from "axios";

const makeRequestToHooksServer = async (
  mailId: string,
  flowId: string,
  userId: string
) => {
  console.log("sending req to hooks server");
  try {
    const { data } = await axios.post(
      `${process.env.HOOKSSERVER_URL}/flows/${userId}/${flowId}`,
      { ids: mailId }
    );

    return data;
  } catch (e: any) {
    console.error(
      "error while making req to hooks server:",
      e.response?.data || e.message
    );
    throw e;
  }
};

export default makeRequestToHooksServer;

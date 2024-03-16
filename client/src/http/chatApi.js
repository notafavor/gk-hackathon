import { $authHost } from ".";

export const sendMessageChat = async (channel, text) => {
  const { data } = await $authHost.post("api/v1/send_message/", {
    channel,
    text,
  });
  return data;
};

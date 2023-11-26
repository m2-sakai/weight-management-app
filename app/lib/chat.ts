import { Message } from '@/app/types/Message';
import axios from 'axios';

export const chat = async (chats: Message[], message: Message): Promise<Message> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [...chats, message].map((d) => ({
        role: d.role,
        content: d.content,
      })),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      // timeout: 20000,
    }
  );

  const data = await response.data;
  if (response.status !== 200) {
    throw data.error || new Error(`Request failed with status ${response.status}`);
  }
  return data.choices[0].message as Message;
};

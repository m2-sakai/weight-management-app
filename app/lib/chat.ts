import { Message } from '@/app/types/Message';

export const chat = async (chats: Message[], message: Message): Promise<Message> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [...chats, message].map((d) => ({
        role: d.role,
        content: d.content,
      })),
    }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw data.error || new Error(`Request failed with status ${response.status}`);
  }
  return data.choices[0].message as Message;
};

'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Message } from '@/app/types/Message';
import { Chat } from '@/app/ui/chat/Chat';
import InputForm from '@/app/ui/chat/InputForm';
import { chat } from '@/app/lib/chat';
import { Flex } from '@chakra-ui/react';

export default function Page() {
  const [chats, setChats] = useState<Message[]>([
    {
      role: 'system',
      content: '',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      const res = await chat(chats, message);

      setChats((prev) => [...prev, res]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-auto bg-white md:rounded-lg md:shadow-md p-4 md:p-10 my-10">
      <div className="mb-10">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return <Chat role={chat.role} content={chat.content} key={index} />;
          })}
        </AnimatePresence>
        {isSubmitting && (
          <Flex alignSelf="flex-start" px="2rem" py="0.5rem">
            ・・・
          </Flex>
        )}
      </div>
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
}

import { Message } from '@/app/types/Message';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flex } from '@chakra-ui/react';
import { GoPerson } from "react-icons/go";
import { MdOutlineEngineering } from "react-icons/md";
import { IconContext } from 'react-icons'

export const Chat = ({ content, role }: Message) => {
  const [chatMessage, setChatMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeoutId = setTimeout(() => {
        setChatMessage((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 80);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [content, currentIndex]);

  return (
    <motion.div
      style={{
        alignSelf: role === 'assistant' ? 'flex-start' : 'flex-end',
        width: 'auto',
      }}
      initial={{
        opacity: 0,
        translateY: '100%',
      }}
      animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, translateY: 0 }}
    >
      <Flex gap="5px" w="full" flexDir={role === 'assistant' ? 'row' : 'row-reverse'} mt="10">
        <IconContext.Provider value={{ size: '50px' }}>
          {role === 'user' ? (<GoPerson />) : (<MdOutlineEngineering />)}
        </IconContext.Provider>
        <Flex
          borderWidth={1}
          borderColor="lightgreen"
          bg="main-bg"
          p="0.5rem 1rem"
          w="auto"
          mt="16"
          rounded={role === 'assistant' ? '0 20px 20px 20px' : '20px 0 20px 20px'}
          flexDir="column"
        >
          {role === 'assistant' && (
            <Flex alignSelf="flex-end" opacity={0.5} fontSize="15px">
              体重管理マン
            </Flex>
          )}
          {role === 'user' && (
            <Flex alignSelf="flex-start" opacity={0.5} fontSize="15px"
            >
              あなた
            </Flex>
          )}
          {role === 'assistant' ? chatMessage || '' : content || ''}
        </Flex>
      </Flex>
    </motion.div>
  );
};

import React, { useRef } from 'react';
import { Message } from '@/app/types/Message';

type InputFormProps = {
  onSubmit: (message: Message) => Promise<void>;
};

const InputForm = ({ onSubmit }: InputFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      onSubmit({
        role: 'user',
        content: inputValue,
      });
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-200">
      <input
        type="text"
        ref={inputRef}
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        placeholder="メッセージを入力..."
      />
      <button
        type="submit"
        className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
      >
        送信
      </button>
    </form>
  );
};

export default InputForm;

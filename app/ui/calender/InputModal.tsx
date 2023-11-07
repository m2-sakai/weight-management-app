import { useFormState } from 'react-dom';
import { Button } from '../common/Button';
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const InputModal = ({
  state,
  date,
  setIsOpenModal,
}: {
  state: boolean;
  date: string;
  setIsOpenModal: ({ state, date }: { state: boolean; date: string }) => void;
}) => {
	
  return (
    <div className="ma fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="max-w-md rounded-lg bg-gray-300 p-8">
        <h2 className="mb-2 text-xl font-bold">{date}</h2>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
          Weight
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          type="number"
          placeholder="00.0"
        />
        <div className="flex justify-between">
          <Button
            className="mt-4 w-[100px]"
            onClick={() => {
              setIsOpenModal({
                state: false,
                date: date,
              });
            }}
          >
            <XMarkIcon className="h-5 w-8 text-gray-50" />
            Cancel
          </Button>
          <Button
            className="mt-4 w-[100px]"
            onClick={() => {
              setIsOpenModal({
                state: false,
                date: date,
              });
            }}
          >
            <PlayIcon className="h-5 w-8 text-gray-50" />
            登録
          </Button>
        </div>
      </div>
    </div>
  );
};

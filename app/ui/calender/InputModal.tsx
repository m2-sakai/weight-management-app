import { Button } from '../common/Button';
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { registerWeight } from '@/app/lib/data';
import { CalendarApi } from '@fullcalendar/core/index.js';
import clsx from 'clsx';

export const InputModal = ({
  email,
  date,
  calenderApi,
  setIsOpenModal,
}: {
  email: string;
  date: string;
  calenderApi: CalendarApi;
  setIsOpenModal: (state: boolean) => void;
}) => {
  const [weight, setWeight] = useState(0);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="ma fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-2 text-2xl text-black font-bold">{date}</h2>
        <label className="block text-black text-base mb-2" htmlFor="weight">
          Weight (kg)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          autoFocus={true}
          type="number"
          placeholder="00.0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setWeight(Number(e.target.value));
            weight > 1 && weight < 1000 ? setIsRegister(true) : setIsRegister(false);
          }}
        />
        <div className="flex justify-between">
          <Button
            className="mt-4 w-[100px]"
            onClick={() => {
              setIsOpenModal(false);
            }}
          >
            <XMarkIcon className="h-5 w-8 text-gray-50" />
            Cancel
          </Button>
          <Button
            className={clsx('mt-4 w-[100px]', {
              'cursor-not-allowed': !isRegister,
            })}
            onClick={async () => {
              setIsOpenModal(false);
              calenderApi.addEvent({
                title: weight.toString() + ' kg',
                start: date,
                allDay: true,
                display: 'list-item',
              });
              await registerWeight(email, weight, date);
            }}
            disabled={!isRegister}
          >
            <PlayIcon className="h-5 w-8 text-gray-50" />
            登録
          </Button>
        </div>
      </div>
    </div>
  );
};

'use client';
import { Metadata } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useEffect, useState } from 'react';
import { InputModal } from '@/app/ui/calender/InputModal';
import { fetchWeights } from '@/app/lib/data';
import { Weight } from '@/app/types/Weight';

// export const metadata: Metadata = {
//   title: 'カレンダー',
// };

export default function Page() {
  const [weights, setWeights] = useState<Weight[]>([]);
  const [isOpenModal, setIsOpenModal] = useState({
    state: false,
    date: '',
  });

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a'; // セッションから取得する

  useEffect(() => {
    const data = async () => {
      const currentDate: Date = new Date();
      const currentMonth: number = currentDate.getMonth() + 1;
      const weightList = await fetchWeights(userId, currentMonth);
      setWeights(weightList);
    };
    data();
  }, []);

  const handleDateClick = (date: string) => {
    setIsOpenModal({
      state: true,
      date: date,
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={jaLocale} // 日本語化
        businessHours={true} // 土日をグレーに塗る
        editable={true}
        initialDate={new Date()}
        contentHeight={'auto'}
        selectable={true}
        dateClick={(e) => {
          handleDateClick(e.dateStr);
        }}
      />
      {isOpenModal.state && (
        <InputModal
          state={isOpenModal.state}
          date={isOpenModal.date}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </div>
  );
}

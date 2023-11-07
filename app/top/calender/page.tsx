'use client';
import { Metadata } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useState } from 'react';
import { InputModal } from '@/app/ui/calender/InputModal';
import { boolean, set } from 'zod';

// export const metadata: Metadata = {
//   title: 'カレンダー',
// };

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState({
    state: false,
    date: '',
  });

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

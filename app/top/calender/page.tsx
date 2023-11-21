'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useCallback, useEffect, useState } from 'react';
import { InputModal } from '@/app/ui/calender/InputModal';
import { fetchWeightsForCalender } from '@/app/lib/weight';
import { getSession } from '@/app/lib/actions';
import { UserSession } from '@/app/types/UserSession';
import { getUser } from '@/app/lib/user';
import { User } from '@/app/types/User';
import { redirect } from 'next/navigation';

type AddEventState = {
  date: string;
  calenderApi: any;
};

type Event = {
  title: string;
  date: string;
  allDay: boolean;
  display: string;
};

const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [heights, setHeights] = useState<number>(0);
  const [currentWeights, setCurrentWeights] = useState<number>(0);
  const [initialEvent, setInitialEvent] = useState<Event[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [addEvent, setAddEvent] = useState<AddEventState>({ date: '', calenderApi: undefined });
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const data = async () => {
      const session: UserSession = await getSession();
      const user: User = await getUser(session.email);
      if (user === undefined) {
        redirect('/');
      }
      setEmail(user.email);
      setHeights(user.height);

      const currentDate: Date = new Date();
      const currentMonth: number = currentDate.getMonth() + 1;
      const weightList = await fetchWeightsForCalender(session.email, currentMonth);
      const initialEventList: Event[] = [];
      weightList.forEach((weight) => {
        const event: Event = {
          title: weight.weight.toString() + ' kg',
          date: weight.date,
          allDay: true,
          display: 'list-item',
        };
        initialEventList.push(event);

        const compareDate = new Date(weight.date);
        if (compareDate.toDateString() === currentDate.toDateString()) {
          setCurrentWeights(weight.weight);
        }
      });
      setInitialEvent(initialEventList);
    };
    data();
  }, []);

  const handleDateClick = useCallback(
    (clickInfo: DateClickArg) => {
      if (selectedDate === clickInfo.dateStr) {
        setAddEvent({
          date: clickInfo.dateStr,
          calenderApi: clickInfo.view.calendar,
        });
        setIsOpenModal(true);
      } else {
        const eventInfo = initialEvent.filter((event) => {
          const compareDate = new Date(event.date)
            .toLocaleDateString('ja-JP', dateFormatOption)
            .split('/')
            .join('-');
          return compareDate === clickInfo.dateStr;
        });
        setCurrentWeights(Number(eventInfo[0].title.replace('kg', '').trim()));
      }
      setSelectedDate(clickInfo.dateStr);
    },
    [selectedDate, initialEvent]
  );

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
        dateClick={(info) => {
          handleDateClick(info);
        }}
        events={initialEvent}
      />
      <p className="text-[30px]">体重: {currentWeights} kg</p>
      <p className="text-[20px]">
        BMI: {(currentWeights / (heights / 100) / (heights / 100)).toFixed(1)}
      </p>
      {isOpenModal && (
        <InputModal
          email={email}
          date={addEvent.date}
          calenderApi={addEvent.calenderApi}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </div>
  );
}

'use client';
import { Metadata } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';

// export const metadata: Metadata = {
//   title: 'カレンダー',
// };

export default function Page() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={jaLocale} // 日本語化
        businessHours={true} // 土日をグレーに塗る
        editable={true}
        initialDate={new Date()}
        contentHeight={'auto'}
      />
    </div>
  );
}

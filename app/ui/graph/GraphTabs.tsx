import React from 'react';

export const GraphTabs = ({ setDayRange }: { setDayRange: (range: number) => void }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <button
                className={
                  'text-xs w-full font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1 ? 'text-white bg-green-600' : 'text-green-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                  setDayRange(7);
                }}
                data-toggle="tab"
                role="tablist"
              >
                1週間
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <button
                className={
                  'text-xs w-full font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2 ? 'text-white bg-green-600' : 'text-green-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                  setDayRange(31);
                }}
                data-toggle="tab"
                role="tablist"
              >
                1ヶ月
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <button
                className={
                  'text-xs w-full font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 3 ? 'text-white bg-green-600' : 'text-green-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                  setDayRange(92);
                }}
                data-toggle="tab"
                role="tablist"
              >
                3ヶ月
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <button
                className={
                  'text-xs w-full font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 4 ? 'text-white bg-green-600' : 'text-green-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                  setDayRange(365);
                }}
                data-toggle="tab"
                role="tablist"
              >
                1年
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

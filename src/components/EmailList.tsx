import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import EmailCard from './EmailCard';
import './EmailList.css';
import { IEmail } from '../@types/data.types';
import { emails as Emails } from '../data/emails';

export default function EmailList() {
  const [emails] = useState<IEmail[]>(Emails);
  return (
    <div className="flex flex-col bg-dark-500  mr-1 px-0 h-full">
      <div className="flex items-center py-6 px-10">
        <span className="font-light text-xl text-light-200">Inbox</span>
        <div className="ml-2 w-5 h-4 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-2xs font-normal text-light-200">
          3
        </div>
        <FontAwesomeIcon
          icon={faPlus}
          className="px-3 py-3 rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 text-light-200 drop-shadow-3xl ml-auto"
        />
      </div>
      <div className="px-10 pb-5">
        <span className="text-xs text-light-200">Recent</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="text-light-200 text-xs ml-2"
        />
      </div>
      <div className="flex flex-col px-10 pb-10 overflow-y-auto">
        {emails.map((email, index) => (
          <EmailCard key={index} {...email} />
        ))}
      </div>
    </div>
  );
}

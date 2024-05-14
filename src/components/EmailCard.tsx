import TimeAgo from 'react-timeago';
import './EmailCard.css';

interface Prop {
  image?: string;
  from?: string;
  time?: string;
  subject: string;
  body: string;
  hasAttachment?: boolean;
  isSelected?: boolean;
  isRead: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
}

export default function EmailCard(props: Prop) {
  const {
    image,
    from,
    time,
    subject,
    body,
    isSelected,
    isRead,
    //  onClick,
  } = props;

  return (
    <div
      className={`${
        isSelected
          ? 'bg-gradient-to-br from-dark-200 to-dark-300 cursor-pointer rounded-3xl drop-shadow-2xl'
          : ''
      } flex flex-row py-10 px-6 hover:bg-gradient-to-br from-dark-200 to-dark-300 cursor-pointer rounded-3xl drop-shadow-2xl`}
    >
      {image ? (
        <img src={image} className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className={`w-12 h-10 mt-3 rounded-xl bg-blue-100`}></div>
      )}

      <div className="flex flex-col w-full ml-3">
        <div className="flex items-center mt-2">
          <span className="text-xs text-light-500 font-medium mr-auto flex items-center space-x-5">
            {from}
            {!isRead && <p className="text-blue-200 text-2xs mx-1">Unread</p>}
          </span>

          <span className="text-light-500 bg-dark-400 text-xs font-medium px-3 py-1 rounded-xl">
            <TimeAgo className="text-sm text-gray-500" date={time as string} />
          </span>
        </div>
        <span className="text-sm text-light-200 font-medium mt-2">
          {subject}
        </span>
        <span className="clamp text-xs font-normal text-light-500 mt-4 w-full">
          {body}
        </span>
      </div>
    </div>
  );
}

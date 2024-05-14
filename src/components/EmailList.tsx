import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailCard from './EmailCard';
import './EmailList.css';
import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import { ISingleMessage, MessageState } from '../features/emails/mailSlice';
import { IMessage } from '../pages/Home';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function EmailList() {
  const mails = useAppSelector((state) => state.mails);
  const user = useAppSelector((state) => state.auth);
  const [mailsData, setMailsData] = useState<MessageState>(mails);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (mails.messages.length === 0) {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${user.token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      fetch(`${import.meta.env.VITE_BACKEND_URL}messages`, requestOptions)
        .then((response) => {
          //  setLoading(false);
          const data = response.json();
          return data;
        })
        .then((result) => {
          if (result.status === 'success') {
            const mailsData: ISingleMessage[] = result.data.map(
              (mail: IMessage) => ({
                _id: mail._id,
                subject: mail.subject,
                content: mail.content,
                isRead: mail.isRead,
                user: `${mail.user.firstName} ${mail.user.lastName}`,
                profileImage: mail.user.profileImage,
                createdAt: mail.createdAt,
              })
            );

            setMailsData({
              messages: mailsData,
              unreadMessages: result.unreadMessages,
              totalMessages: result.totalMessages,
            });
          } else {
            toast(result.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log('THIS IS AN ERROR', error);
          return console.error(error);
        });
    }
  }, []);

  return (
    <div className="flex flex-col bg-dark-500  mr-1 px-0 h-full w-full">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4F46E5"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="flex items-center py-6 px-10">
            <span className="font-light text-xl text-light-200">Inbox</span>
            <div className="ml-2 w-5 h-4 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-2xs font-normal text-light-200">
              {mailsData.unreadMessages}
            </div>
          </div>
          <div className="px-10 pb-5">
            <span className="text-xs text-light-200">Recent</span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className="text-light-200 text-xs ml-2"
            />
          </div>
          <div className="flex flex-col px-10 pb-10 overflow-y-auto">
            {mailsData.messages.map((email, index) => (
              <Link to={`/email/${email._id}`}>
                <EmailCard
                  _id={email._id}
                  key={index}
                  from={email.user}
                  subject={email.subject}
                  body={email.content}
                  isRead={email.isRead}
                  image={email.profileImage}
                  time={email.createdAt}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

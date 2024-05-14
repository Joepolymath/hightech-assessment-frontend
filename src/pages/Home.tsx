/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ContentHeader from '../components/ContentHeader';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ISingleMessage,
  loadMessages,
  MessageState,
} from '../features/emails/mailSlice';
import { ThreeDots } from 'react-loader-spinner';

export interface IMessage extends Document {
  user: any;
  subject: string;
  content: string;
  isRead: boolean;
  messageTo: any;
  createdAt: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [mails, setMails] = useState<MessageState | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  useEffect(() => {
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
          console.log({ result });
          const mailsData: ISingleMessage[] = result.data.map(
            (mail: IMessage) => ({
              subject: mail.subject,
              content: mail.content,
              isRead: mail.isRead,
              user: `${mail.user.firstName} ${mail.user.lastName}`,
              profileImage: mail.user.profileImage,
              createdAt: mail.createdAt,
            })
          );

          setMails({
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
  }, []);

  useEffect(() => {
    if (mails?.messages) {
      dispatch(loadMessages(mails!));
    }
  }, [mails]);

  return (
    <div className="h-screen w-screen flex justify-center items-center  bg-dark-200">
      <div className=" w-full h-full bg-dark-600 lg:w-10/12">
        <ContentHeader />
        {loading ? (
          <div className="flex items-center justify-center h-full">
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
          <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
            <h2 className="text-white font-bold text-xl">
              Hello {user.firstName} {user.lastName}
            </h2>
            <h3 className="text-white text-lg">
              You Have {mails?.unreadMessages} Unread Messages out of{' '}
              {mails?.totalMessages} Total
            </h3>
            <button
              className="bg-blue-200 p-3 rounded-lg text-white"
              onClick={(e) => {
                e.preventDefault();
                navigate('/emails');
              }}
            >
              View Messages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

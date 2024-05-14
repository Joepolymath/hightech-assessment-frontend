import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ISingleMessage } from '../features/emails/mailSlice';
import ReactTimeago from 'react-timeago';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

export default function EmailDetails() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ISingleMessage | null>(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${user.token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}messages/getOne?_id=${id}`,
      requestOptions
    )
      .then((response) => {
        //  setLoading(false);
        const data = response.json();
        return data;
      })
      .then((result) => {
        if (result.status === 'success') {
          setData({
            _id: result.data._id,
            content: result.data.content,
            subject: result.data.subject,
            isRead: result.data.isRead,
            user: `${result.data.user.firstName} ${result.data.user.lastName}`,
            createdAt: result.data.createdAt,
            profileImage: result.data.user.profileImage,
          });
        } else {
          toast(result.message);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-dark-200">
      {loading ? (
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
      ) : (
        <div className="flex flex-col bg-dark-500 w-2/3">
          <span className="text-2xs text-center text-light-600 my-6">
            {/* 13 / 13 */}
          </span>
          <div className="flex items-center px-10">
            <div className="w-10 h-10 rounded-xl bg-red-200 mr-4"></div>
            <span className="text-sm text-light-200 font-medium">
              {data?.user}
            </span>
            <div className="flex relative ml-6">
              <div className="w-6 h-6 rounded-full bg-red-200 border border-2 border-dark-600"></div>
              <div className="w-6 h-6 rounded-full bg-blue-200 border border-2 border-dark-600 absolute ml-3"></div>
              <div className="w-6 h-6 rounded-full bg-green-200 border border-2 border-dark-600 absolute ml-6"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-200 border border-2 border-dark-600 absolute ml-9"></div>
            </div>
            <div className="flex ml-auto"></div>
          </div>
          <span className="px-10 text-2xs text-light-600 font-bold mt-6">
            <ReactTimeago
              className="text-sm text-gray-500"
              date={data?.createdAt as string}
            />
          </span>
          <span className="px-10 text-lg text-light-100 font-light mb-6">
            {data?.subject}
          </span>
          <div className="px-10 text-xs text-light-500 p-5">
            {data?.content}
          </div>
        </div>
      )}
    </div>
  );
}

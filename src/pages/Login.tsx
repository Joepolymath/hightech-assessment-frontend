/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useAppDispatch } from '../app/hooks';
import { AuthState, login } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_BACKEND_URL);
    setLoginData((prev: ILoginData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(loginData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/users/login`,
      requestOptions
    )
      .then((response) => {
        //  setLoading(false);
        const data = response.json();
        return data;
      })
      .then((result) => {
        if (result.status === 'success') {
          toast('Login Successful');
          const data: AuthState = {
            isAuthenticated: true,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            token: result.data.accessToken,
          };
          dispatch(login(data));
          navigate('/');
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
  };

  return (
    <div className="bg-dark-600 w-screen h-svh flex items-center justify-center lg:bg-dark-200">
      <div className=" w-full flex flex-col items-center justify-center md:w-2/4 h-3/4 md:bg-dark-600 md:rounded-md">
        <h2 className="text-blue-200 font-bold text-lg lg:text-2xl">Login</h2>
        <form
          action=""
          className="w-[80%] flex flex-col space-y-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full p-3 m-2 rounded-md"
            onChange={handleChange}
            value={loginData.email}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full p-3 m-2 rounded-md"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-200 p-2 rounded-lg text-white w-1/4 mx-auto my-5"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ThreeDots
                  visible={true}
                  height="20"
                  width="60"
                  color="#4F46E5"
                  radius="6"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';

interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginData((prev: ILoginData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full p-3 m-2 rounded-md"
            value={loginData.password}
          />
          <button
            type="submit"
            className="bg-blue-200 p-2 rounded-lg text-white w-1/4 mx-auto my-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

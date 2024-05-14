import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

export default function ContentHeader() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <nav className="bg-dark-500 flex items-center  justify-between py-6 px-10 mb-1 border-b-[1px] border-white">
      <div>
        <img
          src="https://media.licdn.com/dms/image/C4D0BAQF_P0o2s2QMUQ/company-logo_200_200/0/1630546112985/mbl_hightech_logo?e=1723680000&v=beta&t=yIHdhgIXsfeafvbbbCwDKYe0hCnCRZlK4ihotKkC-68"
          alt="logo"
          className="w-10 h-10"
        />
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-200 rounded-xl ml-8 mr-4"></div>
        <span className="font-light text-xs text-light-100">
          {user.firstName} {user.lastName}
        </span>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className="text-light-100 mx-2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
          data-tooltip-id="logout"
        />
      </div>
      <ReactTooltip id="logout" place="bottom" content="Logout" />
    </nav>
  );
}

import SideNav from './SideNav';
import Main from './Main';

const MainLayout = () => {
  return (
    <div className="w-full lg:w-10/12 h-full flex  bg-blue-200">
      <SideNav />
      <Main />
    </div>
  );
};

export default MainLayout;

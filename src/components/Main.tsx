import ContentHeader from './ContentHeader';
// import EmailDetails from './EmailDetails';
import EmailList from './EmailList';

const Main = () => {
  return (
    <main className="flex flex-col w-full bg-dark-600 h-full">
      <ContentHeader />
      <div className="flex flex-row" style={{ height: 'calc(100% - 84px)' }}>
        <EmailList />
        {/* <EmailDetails /> */}
      </div>
    </main>
  );
};

export default Main;

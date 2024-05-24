import { PageHeader, PageHeaderHeading } from '../page-header';
import logo from '../../assets/logoTravelBuddy.svg';

export const Header = () => {
  return (
    <>
      <header className='flex flex-col items-center justify-center py-2'>
        <img src={logo} alt='Travel Buddy Logo' className='w-[150px] h-[150px] filter dark:invert' />
        <PageHeader>
          <PageHeaderHeading className='text-4xl mb-4'>Wander Buddy</PageHeaderHeading>
        </PageHeader>
      </header>
    </>
  );
};
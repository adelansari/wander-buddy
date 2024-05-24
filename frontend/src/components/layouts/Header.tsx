import { PageHeader, PageHeaderHeading } from '../page-header';
import logo from '../../assets/logoTravelBuddy.svg';

export const Header = () => {
  return (
    <>
      <header className='flex items-center justify-center gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row'>
        <PageHeader>
          <div className="flex flex-col items-center">
            <img 
              src={logo} 
              alt="Travel Buddy Logo" 
              className="h-10 w-10 md:h-12 md:w-12 filter dark:invert mb-2" 
            />
            <PageHeaderHeading className='text-4xl mb-4'>Wander Buddy</PageHeaderHeading>
          </div>
        </PageHeader>
      </header>
    </>
  );
};

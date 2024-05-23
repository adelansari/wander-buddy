import { PageHeader, PageHeaderHeading } from '../page-header';

export const Header = () => {
  return (
    <>
      <header className='flex items-center justify-center gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row'>
        <PageHeader>
          <PageHeaderHeading>Wander Buddy</PageHeaderHeading>
        </PageHeader>
      </header>
    </>
  );
};

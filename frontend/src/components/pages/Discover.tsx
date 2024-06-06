import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchAll from '../custom/discover/searchAll/SearchAll';
import HelpMeChoose from '../custom/discover/helpMeChoose/HelpMeChoose';
import SurpriseMe from '../custom/discover/surpriseMe/SurpriseMe';
import BackToTopButton from '../layouts/BackToTopButton'; 

const Discover = () => {
  return (
    <div>
      <Tabs defaultValue='searchAll' className='w-full mt-4'>
        <TabsList className='flex justify-center items-center w-full md:w-1/2 md:mx-auto'>
          <TabsTrigger value='searchAll' className='w-full text-center'>
            Search All
          </TabsTrigger>
          <TabsTrigger value='helpMeChoose' className='w-full text-center'>
            Help me choose
          </TabsTrigger>
          <TabsTrigger value='surpriseMe' className='w-full text-center'>
            Surprise me
          </TabsTrigger>
        </TabsList>

        <TabsContent value='searchAll'>
          <SearchAll />
        </TabsContent>
        <TabsContent value='helpMeChoose'>
          <HelpMeChoose />
        </TabsContent>
        <TabsContent value='surpriseMe'>
          <SurpriseMe />
        </TabsContent>
      </Tabs>
      <BackToTopButton />
    </div>
  );
};

export default Discover;

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchAll from '../custom/discover/SearchAll';
import HelpMeChoose from '../custom/discover/HelpMeChoose';
import SurpriseMe from '../custom/discover/SurpriseMe';

const Discover = () => {
  return (
    <Tabs defaultValue='searchAll' className='w-full'>
      <TabsList>
        <TabsTrigger value='searchAll'>Search All</TabsTrigger>
        <TabsTrigger value='helpMeChoose'>Help me choose</TabsTrigger>
        <TabsTrigger value='surpriseMe'>Surprise me</TabsTrigger>
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
  );
};

export default Discover;

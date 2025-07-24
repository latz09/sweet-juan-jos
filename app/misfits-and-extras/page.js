import { sanityClient } from '@/lib/sanityConnection'
import { FETCH_MISFITS_AND_EXTRAS_SETTINGS } from '@/data/queries/misfits-and-extras/FETCH_MISFITS_AND_EXTRAS_SETTINGS';
import { FETCH_ACTIVE_MISFITS_BATCHES } from '@/data/queries/misfits-and-extras/FETCH_ACTIVE_MISFITS_BATCHES';
import PageEntry from "@/components/utils/animations/PageEntry";
import MisfitsIntroduction from '@/components/misfits-and-extras/MisfitsIntroduction';
import MisfitBatches from '@/components/misfits-and-extras/MisfitBatches';

const MisfitsAndExtrasPage = async () => {
        const [settings, misfitBatches] = await Promise.all([
            sanityClient.fetch(FETCH_MISFITS_AND_EXTRAS_SETTINGS),
            sanityClient.fetch(FETCH_ACTIVE_MISFITS_BATCHES),
        ]);

        
    return (
        <PageEntry>
           <MisfitsIntroduction title={settings.pageTitle} introText={settings.introText} />
           <MisfitBatches data={misfitBatches} />
        </PageEntry>
    );
}
 
export default MisfitsAndExtrasPage;

export const revalidate = 10;
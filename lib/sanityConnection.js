import { createClient } from 'next-sanity';

export const sanityClient = createClient({
    projectId:  '5veay66n',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2022-03-07', // use the latest API version you are comfortable with
    useCdn: false,
    token: process.env.SANITY_API_TOKEN, 

}); 



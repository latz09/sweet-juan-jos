import { createClient } from 'next-sanity';

export const sanityClient = createClient({
    projectId:  '5veay66n',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2022-03-07', // use the latest API version you are comfortable with
    // token: 'Bearersk4o3wuT4FFDGCj9OTApGEJLxPR57gsaSFH7S4y2SwyzhjQp34qgUHNQ56pg8KdTm3jDBDB3TxxLjzF1kiLBaoqcNjHRO3VMMX9DxoI88zdCAkvo5N307CiS30aUgUehAhigamuxYP3HjLHqXU3y2s2C5PoK5XePH0RI17dnMzvoxoibsXG8',
    useCdn: false
});

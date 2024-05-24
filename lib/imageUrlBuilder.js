import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Your Sanity client configuration
export const config = {
  projectId: '5veay66n',
  dataset: 'production',
  apiVersion: '2021-03-25', // or today's date
  useCdn: true,
};

const sanityClient = createClient(config);

// Set up the builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to use for getting image URLs
export function urlFor(source) {
  return builder.image(source);
}


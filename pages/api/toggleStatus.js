import { createClient } from 'next-sanity';

const sanityClient = createClient({
  projectId: '5veay66n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2022-03-07',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { id, newStatus } = req.body;
      console.log('ID:', id, 'New Status:', newStatus); // Add this line
  
      try {
        await sanityClient
          .patch(id)
          .set({ status: newStatus })
          .commit();
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Failed to update status:', error);
        res.status(500).json({ success: false, error: 'Failed to update status' });
      }
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  }

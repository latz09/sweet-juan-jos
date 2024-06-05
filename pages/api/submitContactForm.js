import { sanityClient } from '@/lib/sanityConnection';
import multiparty from 'multiparty';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req, form) => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const form = new multiparty.Form({ uploadDir: '/tmp' });

  try {
    const { fields, files } = await parseForm(req, form);

    const { name, email, phoneNumber, eventDate, amount, interests, additionalDetails } = fields;

    const safeEventDate = eventDate && !isNaN(new Date(eventDate).getTime())
      ? new Date(eventDate).toISOString()
      : null;

    let parsedInterests;
    try {
      parsedInterests = JSON.parse(interests[0]);
    } catch (e) {
      throw new Error('Invalid JSON in interests field');
    }

    const uploadedImages = await Promise.all(
      (files.inspirationPhotos || []).map(async (file) => {
        try {
          const asset = await sanityClient.assets.upload('image', fs.createReadStream(file.path), {
            filename: file.originalFilename,
          });
          fs.unlinkSync(file.path); // Clean up temp file
          return {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            _key: uuidv4(), // Add unique key for each image
          };
        } catch (uploadError) {
          fs.unlinkSync(file.path); // Ensure temp file is cleaned up on error
          throw new Error('Failed to upload image');
        }
      })
    );

    const result = await sanityClient.create({
      _type: 'contactForm',
      name: name[0],
      email: email[0],
      phoneNumber: phoneNumber[0],
      eventDate: safeEventDate,
      amount: parseInt(amount[0], 10),
      interests: parsedInterests,
      inspirationPhotos: uploadedImages,
      additionalDetails: additionalDetails[0],
      sentAt: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

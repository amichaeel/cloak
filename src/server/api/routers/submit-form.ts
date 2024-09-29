// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from '~/server/db';
// import { formResponses } from '~/server/db/schema';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { formId, responseData } = req.body;

//     if (!formId || !responseData) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newResponse = await db.insert(formResponses).values({
//       formId,
//       responseData,
//     }).returning();

//     res.status(200).json({ message: 'Form submitted successfully', response: newResponse[0] });
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     res.status(500).json({ message: 'Error submitting form' });
//   }
// }
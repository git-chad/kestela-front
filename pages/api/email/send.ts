// import type { NextApiRequest, NextApiResponse } from 'next';
// import { EmailTemplate } from '@/components/Email-Template';
// import { Resend } from 'resend';

// const resendKey = process.env.RESEND_API_KEY as string;
// const resend = new Resend(resendKey);

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { data } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: 'tobimocc@gmail.com',
//       subject: 'Kestela | Invitation',
//       react: EmailTemplate({ firstName: 'Toti Loki', company: 'Set & Forget' }),
//     });

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// http://localhost:3000/api/email/send
// react: EmailTemplate({ firstName: 'Toti Loki', company: 'Set & Forget' })
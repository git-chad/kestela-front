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

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/Email-Template';

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { emails, company } = req.body;
        const resendKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;

        const resend = new Resend(resendKey);

        try {
            const { data } = await resend.emails.send({
                from: 'Kestela <onboarding@resend.dev>',
                to: emails,
                subject: 'Kestela | ' + company + ' Invitation',
                react: EmailTemplate({ firstName: 'El Toto Loco', company: company }),
            })

            console.log("emails in api call", emails);

            res.status(200).json(data);
        } catch (error) {
            console.error('Failed to send invitations:', error);
            res.status(500).json({ error: 'Failed to send invitations' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

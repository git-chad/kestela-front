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

import React, { useState } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/Email-Template';
import { Resend } from 'resend';

const Invites = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const resendKey = process.env.RESEND_API_KEY as string;

  const company = "Set & Forget"

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === ' ' && inputValue) {
      setEmails([...emails, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  const send = async (event: any) => {
    console.log('sending...');
    
    'use server';
    event.preventDefault()
    const resend = new Resend(resendKey);

    try {
      const { data } = await resend.emails.send({
        from: 'Kestela <onboarding@resend.dev>',
        to: emails, 
        subject: 'Kestela | ' + company + ' Invitation',
        react: EmailTemplate({ firstName: 'El Toto Loco', company: company }),
      });

      console.log(data);
      setEmails([]); 
    } catch (error) {
      console.error('Failed to send invitations:', error);
    }
  };

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
      <h1 className="text-5xl font-medium">Your Invitations</h1>
      <h2 className="text-2xl mb-16">Let's find your next investor</h2>

      <form className="flex flex-col space-y-4 w-1/3" onSubmit={send}>
        <p className="text-sm text-[#333333]">
          Validate the emails entered by tapping spacebar
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter email addresses"
          className="mt-2 p-2 border-2 border-gray-300 rounded-xl text-sm"
        />

        <div className="mt-4">
          {emails.map((email, index) => (
            <div
              key={index}
              className="inline-block m-1 px-3 py-1 bg-[#c2c9ff] text-[#333333] text-sm rounded-xl"
            >
              {email}
            </div>
          ))}
        </div>

        <button
          type='submit'
          className="mt-4 px-4 py-2 bg-[#5064ff] text-white rounded-xl font-medium"
        >
          Send Invitations
        </button>
      </form>
    </div>
  );
};

export default Invites;

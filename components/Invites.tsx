import React, { useState } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/Email-Template';
import { Resend } from 'resend';

const Invites = () => {
  const company = 'Set & Forget';
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [quickBooksAccess, setQuickBooksAccess] = useState<Record<string, boolean>>({});

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && inputValue) {
      setEmails([...emails, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (email: string) => {
    setQuickBooksAccess((prevAccess) => ({
      ...prevAccess,
      [email]: !prevAccess[email],
    }));
  };

  const send = async (event: any) => {
    console.log('sending... to', emails);

    event.preventDefault();

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: emails,
          company: company,
        }),
      });

      const data = await response.json();
      console.log(data);
      setEmails([]);
    } catch (error) {
      console.error('Failed to send invitations:', error);
    }
  };

  return (
    <div className="mt-20 flex flex-col">
      <h2 className="text-2xl mb-8">Invite your next collaborator</h2>
      <p className="text-sm text-gray-400">
        Validate the emails entered by tapping spacebar
      </p>
      <form className="flex flex-col w-1/3" onSubmit={send}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter email addresses"
          className="mt-2 p-2 border-2 border-gray-300 rounded-xl text-sm"
        />

        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Ask for Quickbooks permissions by selecting emails
          </p>
          {emails.map((email, index) => (
            <label
              key={index}
              className="inline-flex items-center m-1 bg-[#c2c9ff] text-[#333333] text-sm rounded-xl cursor-pointer px-2 hover:scale-[102%] hover:bg-[#919df3] transition-all"
              onClick={() => handleCheckboxChange(email)}
            >
              <span className="px-3 py-1">{email}</span>
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-0 ring-0"
                checked={!!quickBooksAccess[email]}
                onChange={() => handleCheckboxChange(email)}
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#5064ff] text-white rounded-xl font-medium"
        >
          Send Invitations
        </button>
      </form>
    </div>
  );
};

export default Invites;

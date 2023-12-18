import { useState } from 'react';
import { ListBulletIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import TemplatesThumbnails from '@/components/TemplatesThumbnails';
import TemplatesFilteredList from '@/components/TemplatesFilteredList';

import imgSamplePL from '@/images/screenshots/templatePlaceholder.png'
import imgSamplePL2 from '@/images/screenshots/templatePlaceholder2.png'
import imgSamplePL3 from '@/images/screenshots/templatePlaceholder3.png'
import imgSamplePL4 from '@/images/screenshots/inventory.png'
import imgSamplePL5 from '@/images/screenshots/vat-returns.png'
import imgSamplePL6 from '@/images/screenshots/templatePlaceholder6.png'
import IFrames from '@/components/IFrames';

export default function Example() {
  const [view, setView] = useState(true);

  const toggleView = () => {
    setView(!view);
  };

  return (
    <div>
      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        <h1 className="text-5xl font-medium">Spreadsheet templates</h1>
        <h2 className="text-2xl mb-8">Get started</h2>
        <button className='w-6 text-[#5064FF] mb-8' onClick={toggleView}>
         {view ? <ViewColumnsIcon/> : <ListBulletIcon/>}
        </button>

        <div>
          {view ? <TemplatesFilteredList templates={templates} /> : <TemplatesThumbnails templates={templates}/>}
        </div>
      </div>
    </div>
  );
}

const templates = [
  {
    id: 1,
    name: 'P&L',
    category: 'Financial Reporting',
    description:
      'Track your business`s financial performance with the Kestela P&L template for Google Sheets. Get instant insights into your profit and loss, and make informed decisions about your business`s future',
    href: '/dashboard/edit-fields',
    imageSrc: imgSamplePL,
    imageAlt: 'template preview',
    preview: IFrames,
  },
  {
    id: 2,
    name: 'Cash Flow',
    category: 'Financial Reporting',
    description: 'Manage your business’s liquidity with ease. This Cash Flow Template helps monitor incoming and outgoing funds, ensuring you maintain a healthy financial balance.',
    href: 'https://docs.google.com/spreadsheets/d/165ZQjRDegYgSONV-Xup_Y3fTBYoJhIoiV9G0S6FTsI8/copy',
    imageSrc: imgSamplePL2,
    imageAlt: 'template preview',
    preview: IFrames,
  },
  {
    id: 3,
    name: 'Budget Forecast',
    category: 'Budgeting & Forecasting',
    description:
      'Project your future expenses and income with our comprehensive Budget Forecast Template. Ideal for businesses planning their financial strategy for the upcoming quarters.',
    href: '/dashboard/budget-forecast',
    imageSrc: imgSamplePL3,
    imageAlt: 'Budget forecast template preview',
    preview: IFrames,
  },
  {
    id: 4,
    name: 'Balance Sheet',
    category: 'Financial Reporting',
    description:
      'Get a snapshot of your company’s financial health with our detailed Balance Sheet Template, showing assets, liabilities, and equity.',
    href: '/dashboard/balance-sheet',
    imageSrc: imgSamplePL4,
    imageAlt: 'Balance sheet template preview',
  },
  {
    id: 5,
    name: 'Expense Tracking',
    category: 'Budgeting & Forecasting',
    description:
      'Keep a close eye on your expenditures with our Expense Tracking Template, designed to help you monitor and categorize every expense.',
    href: '/dashboard/expense-tracking',
    imageSrc: imgSamplePL6,
    imageAlt: 'Expense tracking template preview',
  },
  {
    id: 6,
    name: 'Invoice Management',
    category: 'Investment & Financing',
    description:
      'Streamline your billing process with our Invoice Management Template. Track issued invoices, received payments, and pending amounts all in one place.',
    href: '/dashboard/invoice-management',
    imageSrc: imgSamplePL5,
    imageAlt: 'Invoice management template preview',
  },
  {
    id: 7,
    name: 'Financial Statement Analysis',
    category: 'Financial Reporting',
    description:
      'Dive deep into your company’s financial statements to analyze performance with our Financial Statement Analysis Template.',
    href: '/dashboard/financial-statement-analysis',
    imageSrc: imgSamplePL2,
    imageAlt: 'Financial statement analysis template preview',
  },
  {
    id: 8,
    name: 'Break-even Analysis',
    category: 'Budgeting & Forecasting',
    description:
      'Determine the point at which your business will be able to cover all its expenses and start generating profit with our Break-even Analysis Template.',
    href: '/dashboard/break-even-analysis',
    imageSrc: imgSamplePL4,
    imageAlt: 'Break-even analysis template preview',
  },
  {
    id: 9,
    name: 'Loan Amortization Schedule',
    category: 'Investment & Financing',
    description:
      'Manage your loan payments and interest rates with our Loan Amortization Schedule Template, allowing you to see the long-term impact of loans on your finances.',
    href: '/dashboard/loan-amortization',
    imageSrc: imgSamplePL6,
    imageAlt: 'Loan amortization schedule template preview',
  },
  {
    id: 10,
    name: 'Sales Forecast',
    category: 'Budgeting & Forecasting',
    description:
      'Predict your future sales volumes and revenue with our Sales Forecast Template, perfect for businesses looking to prepare for growth and seasonal trends.',
    href: '/dashboard/sales-forecast',
    imageSrc: imgSamplePL3,
    imageAlt: 'Sales forecast template preview',
  },
  {
    id: 11,
    name: 'Inventory Management',
    category: 'Expense Management',
    description:
      'Optimize your stock levels and minimize carrying costs with our Inventory Management Template, tailored for businesses that need efficient inventory tracking.',
    href: '/dashboard/inventory-management',
    imageSrc: imgSamplePL,
    imageAlt: 'Inventory management template preview',
  },
  {
    id: 12,
    name: 'Startup Costs',
    category: 'Expense Management',
    description:
      'Plan out your initial business costs with our Startup Costs Template. It’s ideal for entrepreneurs calculating the capital needed to start their business ventures.',
    href: '/dashboard/startup-costs',
    imageSrc: imgSamplePL5,
    imageAlt: 'Startup costs template preview',
  },
];

import Image from 'next/image';
import Link from 'next/link';

import imgGoogleDrive from '@/images/logos/google_drive_icon_2020.svg';
import imgSamplePL from '@/images/screenshots/sampleP&L.png';

const products = [
  {
    id: 1,
    name: 'P&L Template',
    color:
      'Track your business`s financial performance with the Kestela P&L template for Google Sheets. Get instant insights into your profit and loss, and make informed decisions about your business`s future',
    href: '/dashboard/edit-fields',
    imageSrc: imgSamplePL,
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '',
  },
  {
    id: 2,
    name: 'Cash Flow Template',
    color:
      'Track your business`s financial performance with the Kestela P&L template for Google Sheets. Get instant insights into your profit and loss, and make informed decisions about your business`s future',
    href: 'https://docs.google.com/spreadsheets/d/165ZQjRDegYgSONV-Xup_Y3fTBYoJhIoiV9G0S6FTsI8/copy',
    imageSrc: imgSamplePL,
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '',
  },
];

export default function Example() {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 max-w-full lg:px-8 bg-slate-50">
        <h2 className="text-xl font-bold text-gray-900">Spreadsheet Templates</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div className="bg-white rounded-md" key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-center"
                  />
                </div>
                <div className="relative mt-4 p-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className=" p-4 mt-6">
                <Link
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  <Image
                    width={20}
                    className="mr-2"
                    src={imgGoogleDrive}
                    alt="google drive"
                    unoptimized
                  />
                  Add to my Google Drive <span className="sr-only">, {product.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

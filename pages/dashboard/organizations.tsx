import React from 'react';

const Organizations = () => {
    return (
        <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
            <h1 className="text-5xl font-medium">Organizations</h1>
            <h2 className="text-2xl mb-16">Link up!</h2>
            <div className='space-y-8'>
                {companies.map(company => (
                    <div className='bg-[#F3F4F6] flex flex-col p-6 rounded-xl max-w-md'>
                        <h1 className='font-medium'>{company.companyName}</h1>
                        <h2 className='text-sm text-[#333333]'>{company.companyDescription}</h2>

                        {company.members.filter(member => member.role === 'Owner').map(owner => (
                            <div key={owner.email} className='text-xs flex w-[40%] justify-between mt-6'>
                                <p className='text-gray-500'>{owner.fullName}</p>
                                <p className='text-[#5865FF]'>{owner.role}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Organizations

const companies = [
    {
        companyName: "Tech Innovators Inc.",
        companyDescription: "A team of innovators in tech",
        members: [
            { fullName: "Alice Johnson", role: "Owner", email: "alice@techinnovators.com" },
            { fullName: "Bob Smith", role: "Admin", email: "bob@techinnovators.com" },
            { fullName: "Charlie Davis", role: "Collaborator", email: "charlie@techinnovators.com" }
        ]
    },
    {
        companyName: "Green Solutions Ltd.",
        companyDescription: "Solutions that are colored in shades of green",
        members: [
            { fullName: "Anita Dick", role: "Owner", email: "anita_d@greensolutions.com" },
            { fullName: "Edward Brown", role: "Collaborator", email: "edward@greensolutions.com" },
            { fullName: "Fiona Clark", role: "Admin", email: "fiona@greensolutions.com" },
            { fullName: "George White", role: "Collaborator", email: "george@greensolutions.com" }
        ]
    },
    {
        companyName: "Future Dynamics Corp.",
        companyDescription: "Currently static, will be dynamic in the future",
        members: [
            { fullName: "Hannah Martin", role: "Owner", email: "hannah@futuredynamics.com" },
            { fullName: "Ian Thompson", role: "Admin", email: "ian@futuredynamics.com" },
            { fullName: "Julia Wilson", role: "Collaborator", email: "julia@futuredynamics.com" },
            { fullName: "Kyle Moore", role: "Collaborator", email: "kyle@futuredynamics.com" },
            { fullName: "Laura Taylor", role: "Collaborator", email: "laura@futuredynamics.com" }
        ]
    },
    {
        companyName: "Rubbers Virginia Ltd.",
        companyDescription: "Self explanatory... I think",
        members: [
            { fullName: "Hannah Martin", role: "Owner", email: "hannah@futuredynamics.com" },
            { fullName: "Ian Thompson", role: "Admin", email: "ian@futuredynamics.com" },
        ]
    }
];

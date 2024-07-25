"use client"

import ContactFormDetail from '@/components/admin/ContactFormDetail';
import InspirationPhotos from '@/components/admin/InspirationPhotos';
import { MdEmail, MdPhone } from 'react-icons/md';
import StatusToggleButton from '@/components/admin/StatusToggleButton';
import BackLinkToAllForms from '@/components/admin/BackLinkToAllForms';
import { useState } from 'react';

const ContactFormDetailsContent = ({ data, id, eventDetails }) => {
	const [status, setStatus] = useState(data.status);

	if (!data) {
		return (
			<div className='max-w-6xl mx-auto p-4'>
				<p className='text-gray-600'>Contact form not found</p>
			</div>
		);
	}

	return (
		<div className='max-w-6xl mx-auto p-2 lg:p-4'>
			<BackLinkToAllForms />
			<h1 className='text-3xl lg:text-4xl font-bold mb-8 text-center lg:text-start mt-8 '>
				{data.name}
			</h1>
			<div className='max-w-4xl mx-auto border border-primary/60 shadow-primary/20 px-6 pt-8 pb-12 rounded-sm shadow-md bg-primary/10'>
				<div className='grid gap-4'>
					<div className='border-b border-primary pb-4 mb-4 text-2xl '>
						<h2 className='text-2xl font-bold mb-4 opacity-70'>
							Contact Information
						</h2>
						<p className='mb-2 flex items-center hover:scale-95 transition duration-500'>
							<MdEmail className='mr-4 text-primary ' />
							<a href={`mailto:${data.email}`} className='text-dark font-bold '>
								{data.email}
							</a>
						</p>
						<p className='flex items-center hover:scale-95 transition duration-500'>
							<MdPhone className='mr-4 text-primary' />
							<a
								href={`tel:${data.phoneNumber}`}
								className='text-dark font-bold '
							>
								{data.phoneNumber}
							</a>
						</p>
					</div>
					<div>
						<h2 className='text-2xl font-bold mb-4 '>Event Details</h2>
						{eventDetails.map((detail, index) => (
							<ContactFormDetail
								key={index}
								label={detail.label}
								value={detail.value}
							/>
						))}
					</div>
					{data.inspirationPhotos && data.inspirationPhotos.length > 0 && (
						<InspirationPhotos photos={data.inspirationPhotos} />
					)}
				</div>
                <div className="grid place-items-end">
				<StatusToggleButton
					id={id}
					currentStatus={status}
					onStatusChange={setStatus}
				/></div>
			</div>
		</div>
	);
};

export default ContactFormDetailsContent;

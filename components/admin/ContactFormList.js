'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdSwapHoriz } from 'react-icons/md';
import AnimateUp from '../utils/animations/AnimateUp';

const ContactFormsList = ({ initialData }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [showAll, setShowAll] = useState(false);

	useEffect(() => {
		filterData();
	}, [searchTerm, showAll]);

	const filterData = () => {
		const filtered = initialData.filter((form) => {
			const matchesSearch = form.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesStatus = showAll || form.status === 'active';
			return matchesSearch && matchesStatus;
		});
		setFilteredData(filtered);
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const toggleShowAll = () => {
		setShowAll((prevShowAll) => !prevShowAll);
	};

	return (
		<div>
			<div className='lg:w-1/2 mx-auto mb-4'>
				<input
					type='text'
					placeholder='Search by name...'
					value={searchTerm}
					onChange={handleSearch}
					className='mb-4 p-2 w-full border-2 border-primary/50 rounded-sm focus:outline-none focus:border-none bg-primary/5 focus:bg-primary/10 font-bold tracking-wide scale-95 focus:scale-100 transition duration-700'
				/>
				<div className='grid place-items-center mt-4'>
					<button
						onClick={toggleShowAll}
						className='p-2 flex items-center gap-4 font-black text-2xl'
					>
						<span>{showAll ? 'All Client Forms' : 'Active Clients Only'}</span>
						<MdSwapHoriz className='text-3xl text-primary' />
					</button>
				</div>
			</div>
			{filteredData.length === 0 ? (
				<p className='font-semibold mx-2'>No contact forms found</p>
			) : (
				<ul className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
					{filteredData.map((form) => (
						<Link key={form._id} href={`/admin/contact-form/${form._id}`}>
							<AnimateUp>
								<li
									className={`p-6  border rounded-sm shadow-lg shadow-primary/20 cursor-pointer transition duration-300 hover:scale-95 ${
										form.status === 'active'
											? 'bg-primary/0 border-primary hover:bg-primary hover:text-light'
											: 'bg-primary/5 shadow-none border-primary/10  opacity-80 hover:bg-primary/0 hover:opacity-100 hover:border-primary hover:shadow-lg'
									}`}
								>
									<div className='flex justify-between items-center'>
										<div>
											<p className='text-xl font-bold'>{form.name}</p>
											<p className='font-semibold mx-2'>{form.email}</p>
											<p className='font-semibold mx-2'>{form.phoneNumber}</p>
											<p className='font-semibold mx-2'>
												Event Date:{' '}
												{new Date(form.eventDate).toLocaleDateString()}
											</p>
											<p className='font-semibold mx-2'>
												Sent At: {new Date(form.sentAt).toLocaleDateString()}
											</p>
										</div>
									</div>
								</li>
							</AnimateUp>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
};

export default ContactFormsList;

export const revalidate = 10;

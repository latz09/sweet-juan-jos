"use client"
import React, { useState } from 'react';
import { MainHeading, SubHeading } from '../utils/Typography';
// import { useRouter } from 'next/router';

const ContactForm = () => {
    // const router = useRouter();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		date: '',
		interests: [],
		amountInDozens: '',
	});

	const handleChange = (e) => {
		const { name, value, type } = e.target;

		// Handle checkboxes separately
		if (type === 'checkbox') {
			setFormData((prevState) => ({
				...prevState,
				[name]: prevState[name].includes(value)
					? prevState[name].filter((i) => i !== value)
					: [...prevState[name], value],
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        // router.reload();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='grid gap-16 max-w-5xl mx-auto place-items-center '
		>
			<div className='grid gap-4'>
				<FormField
					label='Name'
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<FormField
					label='Email'
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<FormField
					label='Phone Number'
					type='tel'
					name='phoneNumber'
					value={formData.phoneNumber}
					onChange={handleChange}
				/>
				<FormField
					label='Event Date'
					type='date'
					name='date'
					value={formData.date}
					onChange={handleChange}
				/>
				{/* New dropdown for selecting amount in dozens */}
				<label className='mb-4 grid lg:grid-cols-2 items-center lg:gap-8 w-[70vw] lg:w-[50vw]'>
    <SubHeading title='Amount in Dozens'/> 
    <select
        name='amountInDozens'
        value={formData.amountInDozens}
        onChange={handleChange}
        className='mt-1 block w-full rounded-sm border border-primary shadow-sm shadow-primary/30 focus:outline-none  bg-light focus:bg-primary/10 focus:border-dark p-4'
    >
        <option value='' >Select Amount</option>
        {[...Array(9)].map((_, i) => (  // Options for 1 to 9 dozen
            <option key={i} value={i + 1}>{`${i + 1} dozen`}</option>
        ))}
        <option value='10+'>10+</option>  
    </select>
</label>

			</div>
			<div>
				<FormField
					label='Interested in (select all that apply)'
					type='checkbox'
					name='interests'
					value={formData.interests}
					onChange={handleChange}
					options={[
						'Wedding',
						'Special Event',
						'Cupcakes',
						'Specialty Cakes',
						'Cookies',
						'Candy & Treats',
						'Delivery',
						'Event Set Up',
						'Display Item Rental',
						'General Inquiry',
						'Other',
					]}
				/>
			</div>
			<FormField
				label='Additional Notes'
				type='textarea' // Specify the type as 'textarea' for a multiline input
				name='additionalNotes'
				value={formData.additionalNotes || ''} // Ensure the value is controlled even if it's initially undefined
				onChange={handleChange}
				required={false} // Set to true if the field is required, or omit/leave as false if it's optional
			/>
			<button
				type='submit'
				className='bg-dark text-light  shadow-lg shadow-dark/50 border border-light/60 hover:border-dark hover:shadow-sm  hover:bg-light hover:text-dark py-3  px-8  font-bold text-2xl lg:text-3xl rounded-sm hover:scale-95 transition duration-700 mt-12'
			>
				Submit Now
			</button>
		</form>
	);
};

export default ContactForm;
const FormField = ({
	label,
	type,
	name,
	value,
	onChange,
	required = false,
	options,
}) => {
	// Check if the type is 'textarea' and render a textarea element instead
	if (type === 'textarea') {
		return (
			<label className='mb-4 grid place-items-center  gap-6 lg:gap-4 w-[90vw] lg:w-[50vw]'>
				<SubHeading title={label} />
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					className='mt-1 block w-full  h-[30vh] border rounded-sm border-primary shadow-sm shadow-primary focus:border-dark focus:outline-none bg-light focus:bg-primary/10 p-4'
					rows='4' // Set the default height of the textarea
				></textarea>
			</label>
		);
	}

	// Handling for checkboxes
	if (type === 'checkbox') {
		return (
			<div className='grid place-items-center gap-4'>
				<legend className='font-bold text-2xl mb-2'>{label}:</legend>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8  '>
					{options.map((option) => (
						<label key={option} className='flex items-center space-x-3'>
							<input
								type='checkbox'
								name={name}
								value={option}
								checked={value.includes(option)}
								onChange={onChange}
								className='accent-primary h-4 w-4'
							/>
							<span className='font-bold'>{option}</span>
						</label>
					))}
				</div>
			</div>
		);
	}

	// Default input fields handling
	return (
		<label className='mb-4 grid lg:grid-cols-2 items-center lg:gap-8 w-[70vw] lg:w-[50vw] '>
			<SubHeading title={`${label} ${required ? '*' : ''}`} />
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				className='mt-1 block w-full rounded-sm border border-primary shadow-sm shadow-primary/30  focus:outline-none  bg-light focus:bg-primary/10 focus:border-dark p-4'
			/>
		</label>
	);
};

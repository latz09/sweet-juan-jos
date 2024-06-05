/* eslint-disable @next/next/no-img-element */
'use client';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubHeading } from '../utils/Typography';
import imageCompression from 'browser-image-compression';
import { motion } from 'framer-motion';

const ContactForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isErrorMessage, setIsErrorMessage] = useState();
	const [successMessage, setSuccessMessage] = useState();
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		eventDate: '',
		amount: '',
		interests: [],
		inspirationPhotos: [],
		additionalDetails: '',
	});

	const handleInputChange = async (e) => {
		const { name, value, type, files } = e.target;

		if (type === 'checkbox') {
			if (e.target.checked) {
				setFormData({
					...formData,
					interests: [...formData.interests, value],
				});
			} else {
				setFormData({
					...formData,
					interests: formData.interests.filter(
						(interest) => interest !== value
					),
				});
			}
		} else if (type === 'file') {
			const fileList = Array.from(files);
			const compressedFiles = await Promise.all(
				fileList.map(async (file) => {
					try {
						const options = {
							maxSizeMB: 1, // Set the max size in MB
							maxWidthOrHeight: 1920, // Set the max width or height of the image
							useWebWorker: true, // Use web workers for faster compression
						};
						const compressedFile = await imageCompression(file, options);
						return compressedFile;
					} catch (error) {
						console.error('Error compressing the image:', error);
						return file; // Use original file if compression fails
					}
				})
			);
			setFormData({
				...formData,
				inspirationPhotos: [...formData.inspirationPhotos, ...compressedFiles],
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const formatLabel = (text) => {
		// Split words based on capital letters and join with space
		return text
			.replace(/([A-Z])/g, ' $1') // Insert a space before all caps
			.replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setIsErrorMessage('');
		setSuccessMessage('');

		const formDataToSend = new FormData();
		formDataToSend.append('name', formData.name);
		formDataToSend.append('email', formData.email);
		formDataToSend.append('phoneNumber', formData.phoneNumber);
		formDataToSend.append('eventDate', formData.eventDate);
		formDataToSend.append('amount', formData.amount);
		formDataToSend.append('interests', JSON.stringify(formData.interests));
		formDataToSend.append('additionalDetails', formData.additionalDetails);

		formData.inspirationPhotos.forEach((file) => {
			formDataToSend.append('inspirationPhotos', file);
		});

		try {
			const response = await fetch('/api/submitContactForm', {
				method: 'POST',
				body: formDataToSend,
			});

			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				const result = await response.json();
				if (result.success) {
					setFormData({
						name: '',
						email: '',
						phoneNumber: '',
						eventDate: '',
						amount: '',
						interests: [],
						inspirationPhotos: [],
						additionalDetails: '',
					});
					setSuccessMessage('Form submitted successfully!');
					router.push(`/thank-you?name=${encodeURIComponent(formData.name)}`); 
				} else {
					setIsErrorMessage(result.message || 'Submission failed');
				}
			} else {
				setIsErrorMessage('Unexpected response from server');
			}
		} catch (error) {
			setIsErrorMessage('Failed to submit form');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-6xl mx-auto p-5 w-full grid gap-10 lg:gap-16'
		>
			<div className='grid lg:grid-cols-2  gap-y-6 lg:gap-y-10 lg:gap-x-12 lg:max-w-4xl lg:mx-auto'>
				<div className=''>
					<label htmlFor='name' className='form-label'>
						Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						required
						className='form-input'
					/>
				</div>

				<div className=''>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
						className='form-input'
					/>
				</div>

				<div className=''>
					<label htmlFor='phoneNumber' className='form-label'>
						Phone Number
					</label>
					<input
						type='tel'
						id='phoneNumber'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleInputChange}
						required
						className='form-input'
					/>
				</div>

				<div className=''>
					<label htmlFor='eventDate' className='form-label'>
						Event Date
					</label>
					<input
						type='datetime-local'
						id='eventDate'
						name='eventDate'
						value={formData.eventDate}
						onChange={handleInputChange}
						className='form-input'
					/>
				</div>
			</div>

			<div className='md:2/3 lg:w-1/4 mx-auto'>
				<label htmlFor='amount' className='form-label'>
					Est. Amount in Dozens
				</label>
				<input
					type='number'
					id='amount'
					name='amount'
					value={formData.amount}
					onChange={handleInputChange}
					className='form-input'
				/>
			</div>

			<fieldset className='grid gap-6  bg-primary/10 shadow-lg rounded-md px-1 py-8 '>
				<div>
					<legend>
						<SubHeading title='Select all that apply' type='dark' />
					</legend>
				</div>
				<div className='form-subheading  max-w- lg:mx-auto grid grid-cols-2 place-iems-center lg:place-items-start text-center gap-x-8 lg:grid-cols-3 lg:gap-y-2 lg:gap-x-12  '>
					{[
						'wedding',
						'cupcakes',
						'cookies',
						'delivery',
						'specialEvent',
						'specialtyCakes',
						'candyAndTreats',
						'eventSetup',
						'generalInquiry',
						'displayItemRental',
						'other',
					].map((interest) => (
						<div key={interest} className=' py-4  '>
							<input
								type='checkbox'
								id={interest}
								name='interests'
								value={interest}
								checked={formData.interests.includes(interest)}
								onChange={handleInputChange}
								className='mr-2'
							/>
							<label htmlFor={interest} className='text-dark  '>
								{formatLabel(interest)}
							</label>
						</div>
					))}
				</div>
			</fieldset>

			<div className='w-full md:w-1/2  mx-auto'>
				<label htmlFor='inspirationPhotos' className='form-label '>
					Inspiration Photos:
				</label>
				<input
					type='file'
					id='inspirationPhotos'
					name='inspirationPhotos'
					accept='image/*'
					multiple
					onChange={handleInputChange}
					className='my-4 w-full  p-2 border border-primary text-2xl rounded-sm  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-light file:text-dark hover:file:bg-primary'
				/>
				<div className='my-4 grid grid-cols-3 place-items-center gap-4'>
					{formData.inspirationPhotos.map((file, index) => (
						<div key={index} className='relative'>
							<img
								src={URL.createObjectURL(file)}
								alt='preview'
								className='w-full h-auto rounded-md shadow-lg shadow-primary/40 '
							/>
							<button
								type='button'
								className='absolute top-2 right-2 py-1 px-3 bg-primary/70 rounded-full '
								onClick={() => {
									setFormData({
										...formData,
										inspirationPhotos: formData.inspirationPhotos.filter(
											(_, idx) => idx !== index
										),
									});
								}}
							>
								<AiOutlineClose className='font-bold text-lg text-light' />
							</button>
						</div>
					))}
				</div>
			</div>

			<div className='lg:w-2/3 lg:mx-auto '>
				<label htmlFor='additionalDetails' className='form-label'>
					Additional Details:
				</label>
				<textarea
					id='additionalDetails'
					name='additionalDetails'
					value={formData.additionalDetails}
					onChange={handleInputChange}
					rows='5'
					className='form-input mt-4'
				></textarea>
			</div>

			<motion.button
				type='submit'
				className={`border border-primary  mx-auto transition duration-700 text-xl shadow font-bold  rounded ${
					isLoading
						? 'border-opacity-0 shadow-none scale-90 w-full'
						: 'hover:bg-primary hover:text-light py-3 px-8 w-full md:w-1/2 lg:w-1/3'
				}`}
				whileTap={{ scale: 0.95 }}
			>
				{!isLoading && (
					<motion.span
						key='submit'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
					>
						Submit
					</motion.span>
				)}
				{isLoading && (
					<motion.div
						key='submitting'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={{ duration: 0.9 }}
						className='grid gap-4 lg:gap-6 place-items-center '
						disabled={isLoading}
					>
						<span className="lg:text-xl">Almost there! Gathering your information...</span>

						<motion.div
							className=''
							animate={{ rotate: 360 }}
							transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
						>
							<motion.div
								className='w-[.4rem] h-[.4rem] bg-primary rounded-full inline-block mx-1'
								initial={{ scale: 1 }}
								animate={{ scale: [1, 1.2, 1] }}
								transition={{
									repeat: Infinity,
									duration: 0.9,
									ease: 'easeInOut',
								}}
							/>
							<motion.div
								className='w-[.4rem] h-[.4rem] bg-dark rounded-full inline-block mx-1'
								initial={{ scale: 1 }}
								animate={{ scale: [1, 1.2, 1] }}
								transition={{
									repeat: Infinity,
									duration: 1.4,
									ease: 'easeInOut',
									delay: 0.5,
								}}
							/>
							<motion.div
								className='w-[.4rem] h-[.4rem] bg-primary rounded-full inline-block mx-1'
								initial={{ scale: 1 }}
								animate={{ scale: [1, 1.2, 1] }}
								transition={{
									repeat: Infinity,
									duration: 0.9,
									ease: 'easeInOut',
									delay: 0.2,
								}}
							/>
						</motion.div>
							
					</motion.div>
				)}
			</motion.button>
		</form>
	);
};

export default ContactForm;

{
	/* USE THIS FOR FOR HANDLING IS LOADING AND WHAT NOT
 <form onSubmit={handleSubmit}>
  //Form Fields here
<button type="submit" disabled={isLoading}>
  {isLoading ? 'Submitting...' : 'Submit'}
</button>
{isErrorMessage && <p className="error">{isErrorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</form> 
*/
}

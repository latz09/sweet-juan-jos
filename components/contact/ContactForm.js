/* eslint-disable @next/next/no-img-element */
'use client';
import { AiOutlineClose } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainHeading, SubHeading } from '../utils/Typography';
import imageCompression from 'browser-image-compression';
import { motion } from 'framer-motion';
import ReadTermsAndConditions from './ReadTermsAndConditions';

const ContactForm = ({ termsAndConditionsData }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isErrorMessage, setIsErrorMessage] = useState();
	const [successMessage, setSuccessMessage] = useState();
	const [isUploading, setIsUploading] = useState(false);

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
		readTermsAndConditions: false,
	});

	const handleInputChange = async (e) => {
		e.preventDefault();
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
			setIsUploading(true);
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
			setIsUploading(false);
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
		formDataToSend.append(
			'readTermsAndConditions',
			formData.readTermsAndConditions
		);
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
			className='max-w-6xl mx-auto  w-full grid gap-10 lg:gap-16'
		>
			<div className='px-8 lg:px-0 grid lg:grid-cols-2  gap-y-6 lg:gap-y-10 lg:gap-x-12 lg:max-w-4xl lg:mx-auto'>
				<div className=''>
					<label htmlFor='name' className='form-label'>
						Name*
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
						Email*
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
						Phone Number*
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
					<label htmlFor='eventDate' className='form-label '>
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

			<fieldset className=' bg-primary/10 py-20 my-8 lg:my-4 '>
				<div className='mb-16'>
					<legend className='grid gap-2 opacity-80'>
						<MainHeading title='Your Interests' type='dark' />
						<SubHeading title='Select all that apply' type='dark' />
					</legend>
				</div>
				<div className='px-6  form-subheading grid gap-y-12 gap-x-4 lg:gap-x-0 lg:gap-y-8 grid-cols-2  place-items-center'>
					{[
						'wedding',
						'cupcakes',
						'cookies',
						'candyAndTreats',
						'specialtyCakes',
						'specialEvent',
						'delivery',
						'orderPickup',
						'eventSetup',
						'generalInquiry',
						'displayItemRental',
						'other',
					].map((interest) => (
						<div
							key={interest}
							className={`grid place-items-center tracking-wider text-lg lg:text-xl  w-full h-full `}
						>
							<input
								type='checkbox'
								id={interest}
								name='interests'
								value={interest}
								checked={formData.interests.includes(interest)}
								onChange={handleInputChange}
								className='sr-only h-full '
							/>
							<label
								htmlFor={interest}
								className={`text-dark rounded-sm  p-4 w-full lg:w-1/2 text-center border h-full grid place-items-center  ${formData.interests.includes(interest) ? 'bg-primary text-light font-bold  shadow-xl border-primary shadow-primary/50' : 'border-primary/60 shadow-sm bg-light/20'}`}
							>
								{formatLabel(interest)}
							</label>
						</div>
					))}
				</div>
			</fieldset>
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

			<div className='w-full md:w-1/2  mx-auto px-1 lg:px-8 my-8 lg:my-0'>
				<div className='grid place-items-center gap-4'>
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
						className='hidden'
					/>
					<label
						htmlFor='inspirationPhotos'
						className='cursor-pointer  shadow-sm text-2xl  px-4 py-2 bg-primary rounded-sm text-light font-bold transition duration-700 hover:bg-primary/80 hover:shadow-xl hover:text-light '
					>
						Choose Files
					</label>
				</div>
				<div className='mt-8 text-2xl text-gray-500  grid place-items-center'>
					{isUploading ? (
						<div className='flex place-items-center text-primary/70 font-semibold'>
							<FaSpinner className='animate-spin mr-4 text-primary' />
							<span>Uploading...</span>
						</div>
					) : formData.inspirationPhotos.length > 0 ? (
						`${formData.inspirationPhotos.length} file(s) uploaded`
					) : (
						'No file chosen'
					)}
				</div>
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

			<div className='lg:w-2/3 lg:mx-auto px-2 '>
				<label htmlFor='additionalDetails' className='form-label'>
					Additional Details:
				</label>
				<textarea
					id='additionalDetails'
					name='additionalDetails'
					value={formData.additionalDetails}
					onChange={handleInputChange}
					rows='7'
					className='form-input mt-4  '
				></textarea>
			</div>
			<div className='grid place-items-center gap-8 '>
				<motion.button
					type='submit'
					className={`border  border-primary  mx-auto transition duration-700 text-xl shadow font-bold  rounded ${
						isLoading
							? 'border-opacity-0 shadow-none scale-90 w-full'
							: ' py-3 px-8 w-5/6 md:w-1/2 lg:w-1/3'
					}`}
					whileHover={{ scale: 1.05 }}
				>
					{!isLoading && (
						<div className='mx-8'>
							<motion.span
								key='submit'
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
							>
								Submit
							</motion.span>
							<div></div>
						</div>
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
							<span className='lg:text-xl'>
								Almost there! Gathering your information...
							</span>

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
				<div className="grid gap-3 place-items-center">
					<ReadTermsAndConditions data={termsAndConditionsData} />
					<div className='flex items-center'>
						<input
							type='checkbox'
							id='readTermsAndConditions'
							name='readTermsAndConditions'
							checked={formData.readTermsAndConditions}
							onChange={(e) =>
								setFormData({
									...formData,
									readTermsAndConditions: e.target.checked,
								})
							}
							required
						/>
						<label htmlFor='readTermsAndConditions' className='ml-2 '>
							I have read and agree to the Terms and Conditions
						</label>
					</div>
				</div>
			</div>
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

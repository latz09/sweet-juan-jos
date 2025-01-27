'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
	const [countdown, setCountdown] = useState(9);
	const router = useRouter();

	useEffect(() => {
		// Countdown logic
		const interval = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		// Redirect to the home page when countdown reaches 0
		if (countdown === 0) {
			router.push('/');
		}

		// Cleanup the interval on component unmount
		return () => clearInterval(interval);
	}, [countdown, router]);

	return (
		<main className='h-[80vh] flex flex-col justify-center items-center bg-gray-100 text-gray-800'>
			<h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
			<p className='text-lg mb-6'>
				Sorry, the page you're looking for doesn't exist.
			</p>
			
			<div>
				<div className='grid gap-4 md:flex items-center'>
					<Link
						href='/'
						className='px-6 py-3 bg-primary text-light font-bold text-xl rounded-lg '
					>
						<span>Go Home</span>
					</Link>
					<Link
						href='/contact'
						className='px-6 py-3 border border-primary/40 text-primary font-bold text-xl rounded-lg '
					>
						<span>Contact Us</span>
					</Link>
				</div>
			</div>
            <p className='text-lg font-medium mt-6'>
				Redirecting to the Home Page in {countdown} seconds...
			</p>
		</main>
	);
}

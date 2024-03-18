import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
	const pageAnimateVariable = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				delay: 0.3,
				duration: 1.1,
			},
		},
		exit: { opacity: 0, transition: { duration: 0.4 } },
	};
	const router = useRouter();
	return (
		<Layout>
			<AnimatePresence mode='wait'>
				<motion.div
					key={router.route}
					variants={pageAnimateVariable}
					className='font-mulish'
					initial='hidden'
					animate='visible'
					exit='exit'
				>
					<Component {...pageProps} />
				</motion.div>
			</AnimatePresence>
		</Layout>
	);
}

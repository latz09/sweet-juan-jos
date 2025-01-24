import AnimateUp from '@/components/utils/animations/AnimateUp';
import { FaBox, FaShuttleVan } from 'react-icons/fa';

export default function StepChooseMethod({ method, onSelectMethod }) {
	return (
		<div>
			<AnimateUp>
				<div className='grid gap-8 text-2xl '>
					<button onClick={() => onSelectMethod('pickup')}>
						{' '}
						<div className='bg-primary px-16 py-4 flex items-center gap-4 rounded-full  text-light shadow-lg shadow-primary/20 font-black sm:hover:shadow-none sm:hover:scale-95 sm:hover:bg-primary/70 transition duration-700'>
							<span>
								<FaBox />
							</span>{' '}
							<span> Pickup</span>
						</div>
					</button>

					<button onClick={() => onSelectMethod('delivery')}>
						{' '}
						<div className='bg-primary px-16 py-4 flex items-center gap-4 rounded-full  text-light shadow-lg shadow-primary/20 font-black sm:hover:shadow-none sm:hover:scale-95 sm:hover:bg-primary/70 transition duration-700'>
							<span>
								<FaShuttleVan />
							</span>{' '}
							<span> Delivery</span>
						</div>
					</button>
				</div>
			</AnimateUp>
		</div>
	);
}

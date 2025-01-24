import AnimateUp from '@/components/utils/animations/AnimateUp';
import { FaBox, FaShuttleVan } from 'react-icons/fa';

export default function StepChooseMethod({ method, onSelectMethod }) {
	return (
		<div>
			<AnimateUp>
				<div className='grid gap-8 '>
					<button onClick={() => onSelectMethod('pickup')}>
						{' '}
						<div className='bg-primary px-8 py-4 flex items-center gap-4 rounded-full text-xl text-light shadow-lg shadow-primary/20 font-black'>
							<span>
								<FaBox />
							</span>{' '}
							<span> Pickup</span>
						</div>
					</button>

					<button onClick={() => onSelectMethod('delivery')}>
						{' '}
						<div className='bg-primary px-8 py-4 flex items-center gap-4 rounded-full text-xl text-light shadow-lg shadow-primary/20 font-black'>
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

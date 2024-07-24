import AnimateUp from '../utils/animations/AnimateUp';
import { SubHeading } from '../utils/Typography';

const Terms = ({ data }) => {
	return (
		<div className='grid gap-8 lg:gap-12'>
			{data.map((item, index) => (
				<AnimateUp key={index}>
					<div className='grid gap-1'>
						<div className='text-2xl lg:text-4xl  font-bold '>{item.title}</div>
						<div className='grid gap-3 mx-2 lg:mx-4'>
							{item.description.map((desc, index) => (
								<p key={index} className='text-lg lg:text-xl font-semibold '>
									{desc}
								</p>
							))}
						</div>
					</div>
				</AnimateUp>
			))}
		</div>
	);
};

export default Terms;

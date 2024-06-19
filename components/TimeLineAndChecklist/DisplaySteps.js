import { MainHeading, SubHeading } from '../utils/Typography';

const DisplaySteps = ({ data }) => {
	return (
		<div className="grid gap-12 lg:gap-16">
			<StepDisplay step={data.step1} />
			<StepDisplay step={data.step2} />
			<StepDisplay step={data.step3} />
		</div>
	);
};

export default DisplaySteps;

const StepDisplay = ({ step }) => {
	return (
		<div className="grid gap-8 lg:gap-12  ">
            
			<h3 className="font-bold  text-center lg:text-start text-2xl lg:text-4xl bg-primary lg:rounded-sm px-8 py-4 shadow-lg text-[#ffffff]">{step.title}</h3>
			<div className="grid gap-4 mx-2 lg:gap-8 lg:mx-12 px-4 mb-6">
				{step.steps.map((step, index) => (
					<div key={index} className='flex items-center gap-4'>
						<input type='checkbox' />
						<p className='text-xl lg:text-2xl'>{step.step}</p>
					</div>
				))}
			</div>
		</div>
	);
};

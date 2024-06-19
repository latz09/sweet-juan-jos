"use client"

import {motion} from 'framer-motion';
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
		<motion.div className="grid gap-4 lg:gap-10  "
            initial={{ opacity: 0, y: 160}}
            whileInView={{ opacity: 1, y: 0}}
            transition={{ duration: 0.7, delay: 0.5}}
            viewport={{ once: true }}
        >
            
			<h3 className="font-bold  text-2xl lg:text-4xl lg:border-b  lg:pb-4 mx-2 px-2 border-primary">{step.title}</h3>
			<div className="grid gap-4 mx-2 lg:gap-8 lg:mx-12 px-4 mb-6">
				{step.steps.map((step, index) => (
					<div key={index} className='flex items-center gap-4'>
						<input type='checkbox' />
						<p className='text-xl lg:text-2xl'>{step.step}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};

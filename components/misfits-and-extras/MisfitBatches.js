import MisfitBatchCard from './MisfitBatchCard';
import { Paragraph } from '../utils/Typography';

const MisfitBatches = ({ data }) => {
	// Handle empty or missing data
	if (!data || !Array.isArray(data) || data.length === 0) {
		return (
			<div className="max-w-5xl mx-auto p-4 text-center">
				<Paragraph content="No misfits available right now. Check back soon!" type="dark" />
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-24">
			<div className="grid gap-16">
				{data.map((batch) => (
					<MisfitBatchCard key={batch._id} batch={batch} />
				))}
			</div>
		</div>
	);
};

export default MisfitBatches;
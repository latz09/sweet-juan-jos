
import MisfitBatchImage from './MisfitBatchImage';
import MisfitBatchContent from './MisfitBatchContent';

const MisfitBatchCard = ({ batch }) => {
	const remaining = batch.totalQuantity - batch.soldQuantity;
	const isSoldOut = remaining <= 0;

	return (
		<div
			className={`bg-primary/5  overflow-hidden  transition-shadow duration-300 ${
				isSoldOut ? 'opacity-60' : ''
			}`}
		>
			<div className="flex flex-col md:flex-row">
				<MisfitBatchImage 
					batch={batch} 
					remaining={remaining} 
					isSoldOut={isSoldOut} 
				/>
				<MisfitBatchContent 
					batch={batch} 
					remaining={remaining} 
					isSoldOut={isSoldOut} 
				/>
			</div>
		</div>
	);
};

export default MisfitBatchCard;
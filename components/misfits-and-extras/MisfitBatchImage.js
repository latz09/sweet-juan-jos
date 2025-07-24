import Image from 'next/image';

const MisfitBatchImage = ({ batch, remaining, isSoldOut }) => {
	const formatTimeRemaining = (expiresAt) => {
		if (!expiresAt) return null;
		
		const now = new Date();
		const expiry = new Date(expiresAt);
		const diffInHours = Math.ceil((expiry - now) / (1000 * 60 * 60));
		
		if (diffInHours <= 0) return "Expired";
		if (diffInHours <= 24) return `${diffInHours}h left`;
		
		const days = Math.ceil(diffInHours / 24);
		return `${days} day${days > 1 ? 's' : ''} left`;
	};

	const timeRemaining = formatTimeRemaining(batch.expiresAt);

	return (
		<div className="relative md:w-80 flex-shrink-0">
			{batch.photo?.asset?.url && (
				<div className="relative w-full">
					<Image
						src={batch.photo.asset.url}
						alt={batch.title}
						width={batch.photo.asset.metadata?.dimensions?.width || 800}
						height={batch.photo.asset.metadata?.dimensions?.height || 600}
						className="w-full h-auto object-cover rounded-l-lg md:rounded-l-lg"
						priority={false}
					/>
				</div>
			)}
			
			{/* Overlay Badges */}
			<div className="absolute top-3 left-3 space-y-2">
				{isSoldOut && (
					<span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
						SOLD OUT
					</span>
				)}
				{!isSoldOut && remaining <= 3 && (
					<span className="bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-bold">
						Only {remaining} left!
					</span>
				)}
			</div>

			{/* Time Remaining Badge */}
			{timeRemaining && !isSoldOut && (
				<div className="absolute top-3 right-3">
					<span className={`px-3 py-2 rounded-full font-bold ${
						timeRemaining.includes('h left') 
							? 'bg-primary text-red-800' 
							: 'bg-dark text-light'
					}`}>
						{timeRemaining}
					</span>
				</div>
			)}
		</div>
	);
};

export default MisfitBatchImage;
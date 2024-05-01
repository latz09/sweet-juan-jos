import landingImage from '../../public/images/ai-generated/cupcake-showcase-3.webp';

export const cupcakeAndSpecialtyCakesData = {
	heading: 'Cupcakes & Specialty Cakes',
	subheading: 'From Cupcakes to Specialty Cakes - We have you covered.',
	img: landingImage,
	CTA: '/sweet-juanjos/contact-us',
	CTAText: 'Request Order Now',
	menuData: {
		heading: 'Cupcakes & Specialty Cakes',
		subheading: 'One Flavor Combination per Dozen / per Cake',
        stipulation: '* Flavors available with cupcakes only. Not available for specialty cakes.',
		cakeFlavors: {
			title: 'Cake Flavors',
			flavors: [
				'Vanilla',
				'Chocolate',
				'Confetti',
				'Almond',
				'Coconut Lime',
				'Lemon',
				'Lemon Poppyseed',
				'Pumpkin (Min. 2 Dozen)*',
				'Red Velvet',
				'Strawberry',
				'Pineapple',
				'Pistachio',
			],
		},
		frostingFlavors: {
			title: 'Frosting Flavors',
			flavors: [
				'Vanilla',
				'Chocolate',
				'Almond',
				'Amaretto',
				'Baileys*',
				'Coconut Lime',
				'Cream Cheese*',
				'Lemon',
				'Maple',
				'Peanut Butter*',
				'Salted Carmel',
				'Whiskey Salted Carmel*',
			],
		},
        sizes: {
            title: 'Small Cake Sizes',
            options: [
				'1-layer 5 inch round (Smash Cake!)',
                '2-layer 5 inch round',
                '2-layer 6 inch round',
                '3-layer 6 inch round',
                '*Additional sizes available upon request',
            ]
        }
	},
};

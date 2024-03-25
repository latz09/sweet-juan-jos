const baseUrl = 'https://sweet-juan-jos.vercel.app';
const ogImage = `${baseUrl}/images/stock/dessert-table.webp`;
const baseKeywords = 'd';
const baseDescription = 'sweet Juanjo\'s is where Stevens Point\'s celebrations get a sprinkle of fun! From weddings to birthdays, our cupcakes, cakes, and cookies are all about making your big moments a tad sweeter and a lot more memorable. Let\'s party, Wisconsin style!';


export const pageMetadata = {
	// HOME PAGE
	'/': {
		title: 'Sweet Jaunjos',
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},

	// Weddings and Special Events
	'/services/weddings-and-special-events': {
		title: 'Weddings & Special Events',
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},
	// Cupcakes and Specialty Cakes
	'/services/cupcakes-and-specialty-cakes': {
		title: 'Cupcakes & Specialty Cakes',
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},
	// Hand Crafted Cookies
	'/services/hand-crafted-cookies': {
		title: 'Hand Crafted Cookies',
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},
	// Candy and Treats
	'/services/candy-and-treats': {
		title: 'Candy and Treats',
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},
	// Contact Us
	'/sweet-juanjos/contact-us': {
		title: 'Contact Us - Sweet Juanjos',
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},
	// Documents
	'/documents': {
		title: "Documents - Sweet Juanjos",
		description: baseDescription,
		ogImage: ogImage,
		keywords: baseKeywords,
	},
};

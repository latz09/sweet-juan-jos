// utils/generatePDFForTips.js
import jsPDF from 'jspdf';
import { base64Logo } from '@/components/utils/base64Logo';

const generatePDFForTips = (data) => {
	const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document in A4 size
	const pageWidth = pdf.internal.pageSize.getWidth(); // Get the width of the page
	const pageHeight = pdf.internal.pageSize.getHeight(); // Get the height of the page

	const marginX = 25; // Set larger margins on the x-axis
	const marginXTitle = 12; // Set larger margins on the x-axis for titles
	const marginY = 6; // Set default margin on the y-axis
	const contentWidth = pageWidth - 2 * marginX; // Calculate the width of the content area

	const lineHeight = 8; // Line height for content
	const sectionSpacing = 4; // Additional spacing below section title
	const maxY = pageHeight - marginY; // Maximum Y position for content

	const newPageMarginTop = 20; // Set margin from the top for new pages

	pdf.setFontSize(12); // Set the default font size for the PDF

	// Add logo
	const logoWidth = 40;
	const logoHeight = 20;
	const logoX = (pageWidth - logoWidth) / 2; // Center the logo horizontally
	pdf.addImage(base64Logo, 'PNG', logoX, marginY, logoWidth, logoHeight); // Add the logo image to the PDF
 
	// Add title
	pdf.setFontSize(20); // Set font size for the title
	const title = 'Things to Remember';
	const textWidth = pdf.getTextWidth(title); // Get the width of the title text
	const textX = (pageWidth - textWidth) / 2; // Center the title text horizontally
	pdf.text(title, textX, marginY + logoHeight + 10); // Add the title text to the PDF

	let yPosition = marginY + logoHeight + 30; // Set the initial Y position for the content

	// Function to add a section with a title and list of items
	const addSection = (title, items, boldTitles = false) => {
		pdf.setFontSize(14); // Set font size for the section title
		pdf.setFont('helvetica', 'bold'); // Set font to bold for the section title

		// Check if a new page is needed before adding the section title
		if (yPosition + lineHeight > maxY) {
			pdf.addPage();
			yPosition = marginY;
		}

		pdf.text(title, marginXTitle, yPosition); // Add the section title
		yPosition += lineHeight + sectionSpacing; // Move Y position down for the items, adding extra space below the section title

		pdf.setFontSize(12); // Set font size for the items
		pdf.setFont('helvetica', 'normal'); // Set font to normal for the items
		items.forEach((item) => {
			if (boldTitles && item.title) {
				pdf.setFont('helvetica', 'bold'); // Set font to bold for item title
				pdf.text(item.title, marginX, yPosition);
				yPosition += lineHeight; // Move Y position down for the description
				pdf.setFont('helvetica', 'normal'); // Set font back to normal for description
			}
			const itemText =
				boldTitles && item.title
					? `${item.description}`
					: `${item.description}`;
			const lines = pdf.splitTextToSize(itemText, contentWidth);

			lines.forEach((line, lineIndex) => {
				// Check if a new page is needed before adding each line of item
				if (yPosition + lineHeight > maxY) {
					pdf.addPage();
					yPosition = marginY;
				}

				pdf.text(line, marginX, yPosition); // Add each line of the item with indent
				yPosition += lineHeight; // Move Y position down for the next line
			});

			yPosition += lineHeight; // Add space between items
		});

		yPosition += lineHeight; // Add some space after each section
	};

	// Add sections with items to the PDF
	addSection(
		'Choosing How Many Desserts to Order',
		data.choosingDesserts.map((item) => ({
			title: item.title,
			description: item.description,
		}))
	);
	addSection(
		'Choosing How Many Cupcake Flavor Varieties to Order',
		data.choosingFlavors.flavorSuggestion.map((item) => ({
			title: item.cupcakeQuantity,
			description: item.numberOfFlavors,
		}))
	);
	addSection(
		'Choosing a Dessert Display Table Size',
		data.choosingTableSize.tableSuggestion.map((item) => ({
			title: item.orderQuantity,
			description: item.tableSize,
		}))
	);

	// Add Delivery section without titles
	pdf.setFontSize(14);
	pdf.setFont('helvetica', 'bold');
	if (yPosition + lineHeight > maxY) {
		pdf.addPage();
		yPosition = marginY;
	}
	pdf.text('Delivery', marginXTitle, yPosition);
	yPosition += lineHeight + sectionSpacing;
	pdf.setFontSize(12);
	pdf.setFont('helvetica', 'normal');
	data.delivery.details.forEach((detail) => {
		const lines = pdf.splitTextToSize(detail, contentWidth);
		lines.forEach((line) => {
			if (yPosition + lineHeight > maxY) {
				pdf.addPage();
				yPosition = marginY;
			}
			pdf.text(line, marginX, yPosition);
			yPosition += lineHeight;
		});
		yPosition += lineHeight;
	});

	// Add Additional Information section on a new page with a top margin
	pdf.addPage();
	yPosition = newPageMarginTop; // Set Y position to the new top margin
	addSection('Additional Information', data.additionalInformation, true);

	pdf.save('things-to-remember.pdf'); // Save the PDF with the given filename
};

export default generatePDFForTips;

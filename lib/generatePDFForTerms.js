// utils/generatePDFForTerms.js
import jsPDF from 'jspdf';
import { base64Logo } from '@/components/utils/base64Logo';

const generatePDFForTerms = (data) => {
  const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document in A4 size
  const pageWidth = pdf.internal.pageSize.getWidth(); // Get the width of the page
  const pageHeight = pdf.internal.pageSize.getHeight(); // Get the height of the page

  const marginX = 25; // Set larger margins on the x-axis
  const marginXTitle = 12; // Set larger margins on the x-axis for titles
  const marginY = 6; // Set default margin on the y-axis
  const contentWidth = pageWidth - 2 * marginX; // Calculate the width of the content area

  const lineHeight = 8; // Line height for content
  const reducedLineHeight = 5; // Reduced line height for intro
  const sectionSpacing = 2; // Additional spacing below section title
  const maxY = pageHeight - marginY; // Maximum Y position for content

  const newPageMarginTop = 20; // Set margin from the top for new pages

  pdf.setFontSize(12); // Set the default font size for the PDF

   // Determine the image format
  
  // Add logo if exists
  if (data.logoUrl) {
    const logoWidth = 40;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2; // Center the logo horizontally
    pdf.addImage(data.logoUrl, 'PNG', logoX, marginY, logoWidth, logoHeight); // Add the logo image to the PDF
  }

  // Add title
  pdf.setFontSize(20); // Set font size for the title
  const title = 'Terms & Conditions';
  const textWidth = pdf.getTextWidth(title); // Get the width of the title text
  const textX = (pageWidth - textWidth) / 2; // Center the title text horizontally
  pdf.text(title, textX, marginY + 30); // Add the title text to the PDF (adjust based on logo presence)

  let yPosition = marginY + 40; // Set the initial Y position for the content

  // Add intro sentences
  pdf.setFontSize(12); // Set font size for intro
  data.intro.forEach((sentence, index) => {
    const textStyle = index === 0 ? 'bold' : 'normal';
    pdf.setFont('helvetica', textStyle);
    const lines = pdf.splitTextToSize(sentence, contentWidth);

    lines.forEach((line) => {
      if (yPosition + reducedLineHeight > maxY) {
        pdf.addPage();
        yPosition = marginY;
      }
      pdf.text(line, marginX, yPosition);
      yPosition += reducedLineHeight; // Use reduced line height for intro
    });
    yPosition += reducedLineHeight; // Use reduced line height for intro
  });

  // Function to add a section with a title and list of items
  const addSection = (title, items) => {
    pdf.setFontSize(14); // Set font size for the section title
    pdf.setFont('helvetica', 'bold'); // Set font to bold for the section title

    // Check if a new page is needed before adding the section title
    if (yPosition + lineHeight > maxY) {
      pdf.addPage();
      yPosition = marginY;
    }

    pdf.text(title, marginXTitle, yPosition); // Add the section title
    yPosition += lineHeight; // Move Y position down for the items

    pdf.setFontSize(12); // Set font size for the items
    pdf.setFont('helvetica', 'normal'); // Set font to normal for the items
    items.forEach((sentence) => {
      const lines = pdf.splitTextToSize(sentence, contentWidth);

      lines.forEach((line) => {
        // Check if a new page is needed before adding each line of item
        if (yPosition + lineHeight > maxY) {
          pdf.addPage();
          yPosition = marginY;
        }

        pdf.text(line, marginX, yPosition); // Add each line of the item with indent
        yPosition += lineHeight; // Move Y position down for the next line
      });

      // Reduced space between items
    });

    yPosition += lineHeight / 2; // Reduced space after each section
  };

  // Add terms sections
  data.terms.forEach((term) => {
    addSection(term.title, term.description);
  });

  pdf.save('terms-and-conditions.pdf'); // Save the PDF with the given filename
};

export default generatePDFForTerms;

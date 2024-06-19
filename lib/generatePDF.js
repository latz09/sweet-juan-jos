// utils/generatePDF.js
import jsPDF from 'jspdf';
import { base64Logo } from '@/components/utils/base64Logo';

const generatePDF = (data) => {
  const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document in A4 size
  const pageWidth = pdf.internal.pageSize.getWidth(); // Get the width of the page
  const pageHeight = pdf.internal.pageSize.getHeight(); // Get the height of the page

  const marginX = 25; // Set larger margins on the x-axis
  const marginXTitle = 12; // Set larger margins on the x-axis for titles
  const marginY = 6; // Set default margin on the y-axis
  const contentWidth = pageWidth - 2 * marginX; // Calculate the width of the content area

  const lineHeight = 6; // Line height for content
  const stepSpacing = 4; // Additional spacing between steps
  const sectionSpacing = 4; // Additional spacing below section title
  const maxY = pageHeight - marginY; // Maximum Y position for content

  const newPageMarginTop = 20; // Set margin from the top for new pages

  pdf.setFontSize(12); // Set the default font size for the PDF

  // Base64 string of the logo image
  // Replace with your actual base64 string

  // Add logo
  const logoWidth = 40;
  const logoHeight = 20;
  const logoX = (pageWidth - logoWidth) / 2; // Center the logo horizontally
  pdf.addImage(base64Logo, 'PNG', logoX, marginY, logoWidth, logoHeight); // Add the logo image to the PDF

  // Add title
  pdf.setFontSize(14); // Set font size for the title
  const title = 'Time Line and Checklist';
  const textWidth = pdf.getTextWidth(title); // Get the width of the title text
  const textX = (pageWidth - textWidth) / 2; // Center the title text horizontally
  pdf.text(title, textX, marginY + logoHeight + 10); // Add the title text to the PDF

  let yPosition = marginY + logoHeight + 30; // Set the initial Y position for the content

  // Function to add a section with a title and list of steps
  const addSection = (title, steps) => {
    pdf.setFontSize(14); // Set font size for the section title
    pdf.setFont('helvetica', 'bold'); // Set font to bold for the section title

    // Check if a new page is needed before adding the section title
    if (yPosition + lineHeight > maxY) {
      pdf.addPage();
      yPosition = marginY;
    }

    pdf.text(title, marginXTitle, yPosition); // Add the section title
    yPosition += lineHeight + sectionSpacing; // Move Y position down for the steps, adding extra space below the section title

    pdf.setFontSize(12); // Set font size for the steps
    pdf.setFont('helvetica', 'normal'); // Set font to normal for the steps
    steps.forEach((stepObj) => {
      const stepText = `${stepObj.step}`;
      const lines = pdf.splitTextToSize(stepText, contentWidth - 10); // Adjust content width to account for bullet

      lines.forEach((line, lineIndex) => {
        // Check if a new page is needed before adding each line of step
        if (yPosition + lineHeight > maxY) {
          pdf.addPage();
          yPosition = marginY;
        }

        if (lineIndex === 0) {
          const circleYPosition = yPosition - 1.5; // Adjust Y position for circle to center it with text
          pdf.circle(marginX - 5, circleYPosition, 2); // Draw a larger hollow circle
        }

        pdf.text(line, marginX, yPosition); // Add each line of the step with indent
        yPosition += lineHeight; // Move Y position down for the next line
      });

      yPosition += stepSpacing; // Add space between steps
    });

    yPosition += lineHeight; // Add some space after each section
  };

  // Add sections with steps to the PDF
  addSection(data.step1.title, data.step1.steps);
  addSection(data.step2.title, data.step2.steps);

  // Add the third section on a new page with a top margin
  pdf.addPage();
  yPosition = newPageMarginTop; // Set Y position to the new top margin
  addSection(data.step3.title, data.step3.steps);

  pdf.save('event-dessert-checklist.pdf'); // Save the PDF with the given filename
};

export default generatePDF;

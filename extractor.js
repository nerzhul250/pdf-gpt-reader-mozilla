 
 console.log("hello")
 
 async function extractTextFromPdf(pages) {
  const pdfViewer = document.querySelector('embed[type="application/pdf"]');
  if (!pdfViewer) {
    return null;
  }

  const pdfUrl = pdfViewer.src;
  const response = await fetch(pdfUrl);
  const pdfData = await response.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: pdfData });

  let extractedText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    if (!pages || pages.includes(i)) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map(item => item.str).join(' ');
    }
  }

  return extractedText;
}

browser.runtime.onMessage.addListener((message) => {
  console.log("got here")
  console.log(message)
  if (message.command === 'extractTextFromPdf') {
    return extractTextFromPdf(message.pages);
  }
});
  


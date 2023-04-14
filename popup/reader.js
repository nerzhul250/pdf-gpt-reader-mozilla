function parsePageRange(pageRange) {
  if (!pageRange) return null;

  const pageNumbers = new Set();
  const pageRanges = pageRange.split(',').map(range => range.trim());

  for (const range of pageRanges) {
    const [start, end] = range.split('-').map(num => parseInt(num, 10));
    const endIndex = end || start;

    for (let pageNum = start; pageNum <= endIndex; pageNum++) {
      pageNumbers.add(pageNum);
    }
  }

  return Array.from(pageNumbers);
}

document.getElementById('processPdf').addEventListener('click', async () => {
  const pageRange = document.getElementById('pageRangeInput').value;
  const pages = parsePageRange(pageRange);
  
  const tab = await browser.tabs.query({ active: true, currentWindow: true });
  const extractedText = await browser.tabs.sendMessage(tab[0].id, { command: 'extractTextFromPdf', pages: pages });
  if (extractedText) {
    const question = document.getElementById('questionInput').value;
    const processedText = await browser.runtime.sendMessage({ command: 'processPdfWithGpt35', text: extractedText, question: question });

    // Display the processed text
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = processedText;
  } else {
    alert('No PDF found or failed to extract text from the PDF.');
  }
});

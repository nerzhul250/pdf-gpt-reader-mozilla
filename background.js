async function processPdfWithGpt35(text,question) {
    // Replace 'your-api-key' with your actual OpenAI API key
    const apiKey = 'your-api-key';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const messages = [
        { role: 'user', content: `Look at the text:\n${text}\nNow answer me this:\n${question}`}
    ];

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages
        })
    });

    const data = await response.json();
    // Updated to use data.choices[0].message.content
    return data.choices[0].message.content.trim();
  }
  
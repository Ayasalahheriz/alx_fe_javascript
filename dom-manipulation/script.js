const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
    // Add more quotes as needed
  ];
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = quote.text;
  }
  
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
    // Add more quotes as needed
  ];
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
    restoreLastFilter();
  });
  
  // Function to display a random quote
  function showRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>${quote.text}</p>`;
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      document.getElementById('quoteDisplay').innerHTML = `<p>New quote added: ${newQuoteText}</p>`;
      saveQuotes();
      populateCategories();
    } else {
      document.getElementById('quoteDisplay').innerHTML = `<p>Please enter both a quote and a category.</p>`;
    }
  }
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to load quotes from local storage
  function loadQuotes() {
    const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (savedQuotes) {
      quotes.push(...savedQuotes);
    }
  
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      document.getElementById('quoteDisplay').innerHTML = `<p>${lastQuote.text}</p>`;
    }
  }
  
  // Function to export quotes to a JSON file
  function exportQuotes() {
    const data = JSON.stringify(quotes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.ta
  
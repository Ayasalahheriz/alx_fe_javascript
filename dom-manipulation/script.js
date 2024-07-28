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
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Function to get filtered quotes based on the selected category
  function getFilteredQuotes() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    if (categoryFilter === 'all') {
      return quotes;
    }
    return quotes.filter(quote => quote.category === categoryFilter);
  }
  
  // Function to populate the category dropdown
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option); // Here's the appendChild
    });
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value; // Get the selected category
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const   
   quote = filteredQuotes[randomIndex];
      document.getElementById('quoteDisplay').innerHTML = `<p>${quote.text}</p>`;
    } else {
      document.getElementById('quoteDisplay').innerHTML = `<p>No quotes available for the selected category.</p>`;
    }
    saveLastFilter();
  }
  
  // Function to save the last selected filter to local storage
  function saveLastFilter() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategoryFilter', categoryFilter);
  }
  
  // Function to restore the last selected filter from local storage
  function restoreLastFilter() {
    const lastCategoryFilter = localStorage.getItem('lastCategoryFilter');
    if (lastCategoryFilter) {
      document.getElementById('categoryFilter').value = lastCategoryFilter;
      filterQuotes();
    }
  }
  
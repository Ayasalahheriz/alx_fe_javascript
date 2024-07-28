const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
    // Add more quotes as needed
  ];
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.addEventListener('DOMContentLoaded', createAddQuoteForm);
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>${quote.text}</p>`;
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
    } else {
      document.getElementById('quoteDisplay').innerHTML = `<p>Please enter both a quote and a category.</p>`;
    }
  }
  
  // Function to create the form for adding a new quote
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formContainer);
  }
  
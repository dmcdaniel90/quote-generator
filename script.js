'use strict';
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}


// Get Quotes From API
async function fetchQuotes() {
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  showLoadingSpinner();

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
    quoteText.style.color = 'initial';

  } catch (error) {
    quoteText.innerHTML = 'An error occurred while fetching the quote. Please try again later.';
    quoteText.style.color = 'red';
    quoteText.classList.add('long-quote');
    console.error(error);
  }
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  authorText.textContent = quote.author ? quote.author : 'Unknown';
  quoteText.textContent = quote.text;
  quoteText.textContent.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
  removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
fetchQuotes();
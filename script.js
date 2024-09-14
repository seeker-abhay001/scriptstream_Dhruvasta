// menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// genre
document.querySelectorAll('#nav-menu a').forEach((genreLink) => {
  genreLink.addEventListener('click', (event) => {
    event.preventDefault();
    const genre = genreLink.getAttribute('data-genre');
    searchBooksByGenre(genre);
  });
});

// displays books based on genre
function searchBooksByGenre(genre) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch(error => console.error('Error fetching books by genre:', error));
}

// back button
document.getElementById('back-btn').addEventListener('click', () => {
  //hide back button
  document.getElementById('back-btn').classList.add('hidden');
  
  // clears the container
  document.getElementById('results').innerHTML = '';
  
  // Optionally, you can add more logic here to revert to the default view
});

// Function to search books by title or author
document.getElementById('search-btn').addEventListener('click', function () {
  const query = document.getElementById('book-input').value.trim();
  if (!query) return;

  // Google Books API
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch(error => console.error('Error fetching books by title or author:', error));
});

// Function to display search results
function displayResults(data) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (data.totalItems === 0) {
    resultsContainer.innerHTML = '<p>No books found.</p>';
    return;
  }

  // create elements from books
  data.items.forEach((item) => {
    const bookTitle = item.volumeInfo.title || 'No title available';
    const bookAuthors = item.volumeInfo.authors
      ? item.volumeInfo.authors.join(', ')
      : 'Unknown author';
    const bookDescription =
      item.volumeInfo.description || 'No description available';
    const bookLink = item.volumeInfo.previewLink || item.volumeInfo.infoLink;
    const bookImage = item.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg';

    // Create a card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Title element
    const bookTitleElement = document.createElement('h3');
    bookTitleElement.classList.add('card-title');
    bookTitleElement.textContent = bookTitle;

    // Description element
    const bookDescriptionElement = document.createElement('p');
    bookDescriptionElement.classList.add('card-description');
    bookDescriptionElement.textContent = bookDescription;

    // Image element
    const bookImageElement = document.createElement('img');
    bookImageElement.src = bookImage;
    bookImageElement.alt = bookTitle;
    bookImageElement.height = '250';
    bookImageElement.width = '313.33';

    // add element
    const bookLinkElement = document.createElement('a');
    bookLinkElement.href = bookLink;
    bookLinkElement.textContent = 'Read More';
    bookLinkElement.classList.add('card-link');
    bookLinkElement.target = '_blank';
    bookLinkElement.rel = 'noopener noreferrer';

    // Add elements to card
    card.appendChild(bookTitleElement);
    card.appendChild(bookDescriptionElement);
    card.appendChild(bookImageElement);
    card.appendChild(bookLinkElement);

    // Add card to results container
    resultsContainer.appendChild(card);
  });
}

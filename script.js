/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const booksContainer = document.querySelector('#books-container');
const booksForm = document.querySelector('.books-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');


const booksArr = [];

// local storage
function booksStorage() {
  localStorage.setItem('books', JSON.stringify(booksArr));
}
// add book to list
function addBook(title, author) {
  const newBook = {
    title,
    author,
  };
  booksArr.push(newBook);

  const bookItem = document.createElement('div');
  booksArr.forEach((book, index) => {
    bookItem.innerHTML = `
    <div class="book-item">
    <p class="book-title">"${book.title}" by ${book.author}</p>                                          
    <button type="button" id="${index}" class="remove-btn">Remove</button>   
    </div>`;

    const removeBtn = bookItem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      booksArr.splice(index, 1);
      bookItem.remove();
      booksStorage();
    });
  });
  booksStorage();

  booksContainer.appendChild(bookItem);
}

// submit button event
booksForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    addBook(bookTitle.value, bookAuthor.value);

    bookTitle.value = '';
    bookAuthor.value = '';
  }
});

function retrieveShelve() {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    books.forEach((book) => {
      addBook(book.title, book.author);
    });
  }
}
retrieveShelve();

// buttons
const navList1 = document.getElementById('list')
const navList2 = document.getElementById('add-new')
const navList3 = document.getElementById('contact')

// sections
const sectionOne = document.getElementById('all-book')
const sectionTwo = document.getElementById('add-new-book')
const sectionThree = document.getElementById('contact-form')

navList1.addEventListener('click', (e) => {
  e.preventDefault();
  sectionOne.classList.remove('hide');
  sectionTwo.classList.add('hide');
  sectionThree.classList.add('hide');
})

navList2.addEventListener('click', (e) => {
  e.preventDefault();
  sectionOne.classList.add('hide');
  sectionTwo.classList.remove('hide');
  sectionThree.classList.add('hide');
})

navList3.addEventListener('click', (e) => {
  e.preventDefault();
  sectionOne.classList.add('hide');
  sectionTwo.classList.add('hide');
  sectionThree.classList.remove('hide');
})
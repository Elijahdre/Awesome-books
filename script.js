// Refactoring using classes

/* eslint-disable max-classes-per-file */

class CreateBook {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// localStorage classes

class LocalStorageClass {
  static getbooksFromStore() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addbookToStore(book) {
    const books = LocalStorageClass.getbooksFromStore();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeFromTheStore(title) {
    const books = LocalStorageClass.getbooksFromStore();
    const filteredArray = books.filter((book) => book.id === title);
    localStorage.setItem('books', JSON.stringify(filteredArray));
  }
}

// class to create book element inside the book list

class CreateBookElements {
  static createBookElement(book) {
    const bookContainer = document.querySelector('#books-container');
    const listContainer = document.createElement('div');
    listContainer.className = 'book-item';
    listContainer.innerHTML += `
            <p>"${book.title}" by ${book.author}</p>
            <button class="remove-btn" data-remove="${book.id}">Delete</button>
            `;

    bookContainer.appendChild(listContainer);
  }
}

// display class

class DisplayBookList {
  static displayBooks() {
    const books = LocalStorageClass.getbooksFromStore();
    books.forEach((book) => CreateBookElements.createBookElement(book));
  }

  static removeBook(target, dataset) {
    if (target.classList.contains('remove-btn')) {
      target.parentElement.remove();

      LocalStorageClass.removeFromTheStore(dataset);
    }
  }
}

document.addEventListener('DOMContentLoaded', DisplayBookList.displayBooks);

const title = document.getElementById('title');
const author = document.getElementById('author');

document.querySelector('.books-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const bookId = Math.random();

  //   create book
  const book = new CreateBook(title.value, author.value, bookId);

  CreateBookElements.createBookElement(book);

  // add it to local storage
  LocalStorageClass.addbookToStore(book);
  // append the book to the book list

  //  Reseting the form inputs
  const form = document.querySelector('.books-form');
  form.reset();
});

// event: remove a book

// Remove book from UI
document.querySelector('#books-container').addEventListener('click', (e) => {
  DisplayBookList.removeBook(e.target, e.target.dataset);

  // remove book from the store
  LocalStorageClass.removeFromTheStore(
    e.target.parentElement.firstElementChild.textContent,
  );
});

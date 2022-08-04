// Refactoring using classes

/* eslint-disable max-classes-per-file */

class CreateBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
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
    const filteredArray = books.filter((book) => book.title !== title);
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
            <button class="remove-btn">Delete</button>
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

  static removeBook(target) {
    if (target.classList.contains('remove-btn')) {
      target.parentElement.remove();
      LocalStorageClass.removeFromTheStore();
    }
  }
}

document.addEventListener('DOMContentLoaded', DisplayBookList.displayBooks);

const title = document.getElementById('title');
const author = document.getElementById('author');

document.querySelector('.books-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //   create book
  const book = new CreateBook(title.value, author.value);

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
  DisplayBookList.removeBook(e.target);

  // remove book from the store
  LocalStorageClass.removeFromTheStore(
    e.target.parentElement.firstElementChild.textContent,
  );
});

// /* eslint-disable no-unused-vars */
// const booksContainer = document.querySelector('#books-container');
// const booksForm = document.querySelector('.books-form');
// const bookTitle = document.getElementById('title');
// const bookAuthor = document.getElementById('author');

// const booksArr = [];

// // local storage
// function booksStorage() {
//   localStorage.setItem('books', JSON.stringify(booksArr));
// }
// // add book to list
// function addBook(title, author) {
//   const newBook = {
//     title,
//     author,
//   };
//   booksArr.push(newBook);

//   const bookItem = document.createElement('div');
//   booksArr.forEach((book, index) => {
//     bookItem.innerHTML = `
//     <div class="book-item">
//     <p class="book-title">"${book.title}"</p>
//     <p class="book-author">by ${book.author}</p>
//     <button type="button" id="${index}" class="remove-btn">Remove</button>                                            
//     </div>`;

//     const removeBtn = bookItem.querySelector('.remove-btn');
//     removeBtn.addEventListener('click', () => {
//       booksArr.splice(index, 1);
//       bookItem.remove();
//       booksStorage();
//     });
//   });
//   booksStorage();

//   booksContainer.appendChild(bookItem);
// }

// // submit button event
// booksForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   if (bookTitle.value !== '' && bookAuthor.value !== '') {
//     addBook(bookTitle.value, bookAuthor.value);

//     bookTitle.value = '';
//     bookAuthor.value = '';
//   }
// });

// function retrieveShelve() {
//   const books = JSON.parse(localStorage.getItem('books'));
//   if (books) {
//     books.forEach((book) => {
//       addBook(book.title, book.author);
//     });
//   }
// }
// retrieveShelve();




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
            <button class=".remove-btn">Delete</button>
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
    if (target.classList.contains(".remove-btn")) {
      target.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', DisplayBookList.displayBooks);
document.querySelector('.books-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('#title');
  const author = document.getElementById('#author');

  //   create book
  const book = new CreateBook(title, author);
  // add it to local storage
  LocalStorageClass.addbookToStore(book);
  // append the book to the book list
  CreateBookElements.createBookElement(book);
  //  Reseting the form inputs
  const form = document.querySelector('.books-form');
  form.reset();
});

// event: remove a book

// Remove book from UI
document.querySelector('#books-container').addEventListener('click', (e) => {
  DisplayBookList.removeBook(e.target);

  // remove book from the store
  LocalStorageClass.removeFromTheStore(e.target.parentElement.firstElementChild.textContent);
});




















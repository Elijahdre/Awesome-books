class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const bookStorage = [];

/* eslint max-classes-per-file: ["error", 2] */

class CreateBook {
  static addBook(newBook, index) {
    const library = document.querySelector('#books-container');
    if (!localStorage.getItem('books')) {
      const noBook = document.createElement('p');
      noBook.innerHTML = 'No books in library';
      library.appendChild(noBook);
    }
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="book-item">
     <p>"${newBook.title}" by ${newBook.author} </p>
     <button class="remove-btn" data-remove=${index}>Delete</button>
    </div>  
     `;

    library.appendChild(container);

    bookStorage.push(newBook);
  }

  // delete function
  static deleteBook(index) {
    bookStorage.splice(index, 1);
    CreateBook.updateLocalStorage();
  }

  // set local storage
  static updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(bookStorage));
  }

  // fetch local storage
  static getLocalStorage() {
    if (localStorage.getItem('books')) {
      const books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book, index) => {
        const newBook = new Book(book.title, book.author);
        CreateBook.addBook(newBook, index);
      });
    } else {
      localStorage.setItem('books', JSON.stringify(bookStorage));
    }
    const deleteBtn = document.querySelectorAll('.remove-btn');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.remove;
        CreateBook.deleteBook(index);
        CreateBook.updateLocalStorage();
        e.target.parentElement.remove();
      });
    });
  }
}

const form = document.querySelector('.books-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title !== '' && author !== '') {
    const newBook = new Book(title, author);
    CreateBook.addBook(newBook);

    CreateBook.updateLocalStorage(newBook);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';

    document.querySelector('#title').focus();
  }

  const deleteBtn = document.querySelectorAll('.remove-btn');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.remove;
      CreateBook.deleteBook(index);
      e.target.parentElement.remove();
    });
  });
});

CreateBook.getLocalStorage();

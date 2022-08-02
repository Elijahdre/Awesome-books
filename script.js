/* eslint-disable no-unused-vars */
const booksContainer = document.querySelector("#books-container");
const booksForm = document.querySelector(".books-form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");

const booksArr = [];

// local storage
function booksStorage() {
  localStorage.setItem("books", JSON.stringify(booksArr));
}
// add book to list
function addBook(title, author) {
  const newBook = {
    title: title,
    author,
  };
  booksArr.push(newBook);

  const bookItem = document.createElement("div");
  booksArr.forEach((book, index) => {
    bookItem.innerHTML = `
    <div class="book-item">
    <p class="book-title">${book.title}</p>
    <p class="book-author">${book.author}</p>                                          
    <button type="button" id="${index}" class="remove-btn">Remove</button>   
    </div>
    <hr>`;
    const removeBtn = bookItem.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      booksArr.splice(index, 1);
      bookItem.remove();
      booksStorage();
    });
  });
  booksStorage();

  booksContainer.appendChild(bookItem);
}

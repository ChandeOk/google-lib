import React from 'react';
import './BookFullInfo.css';
function BookFullInfo({ data, bookId }) {
  const { volumeInfo: book } = data(bookId);
  console.log(book);
  return (
    <div className='book-full-info-container'>
      <div className='book-full-info-img-container'>
        <img
          className='book-full-info-img'
          src={book.imageLinks ? book.imageLinks.thumbnail : ''}
          alt=''
        />
      </div>
      <div className='book-full-info-about-container'>
        <p className='book-full-info-category'>
          {book.categories ? book.categories.join(', ') : ''}
        </p>
        <h2 className='book-full-info-title'>{book.title ? book.title : ''}</h2>
        <h3 className='book-full-info-authors'>
          {book.authors ? book.authors.join(', ') : ''}
        </h3>
        <p className='book-full-info-description'>
          {book.description ? book.description : ''}
        </p>
      </div>
    </div>
  );
}

export default BookFullInfo;

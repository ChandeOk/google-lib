import React, { useEffect } from 'react';
import './BookCard.css';
import { store } from './store/store';
import { api } from './store/api';
function BookCard({
  authors,
  title,
  image,
  categories,
  id,
  setSelectedBookId,
}) {
  return (
    <div className='book-card-container' data-id={id}>
      <div
        className='book-card-img-container'
        onClick={() => {
          setSelectedBookId(id);
        }}
      >
        <img src={image ? image : ''} alt='' className='book-card-img' />
      </div>
      <p className='book-card-category'>{categories ? categories[0] : ''}</p>
      <h2 className='book-card-name'>{title ? title : ''}</h2>
      <p className='book-card-author'>{authors ? authors.join(', ') : ''}</p>
    </div>
  );
}

export default BookCard;

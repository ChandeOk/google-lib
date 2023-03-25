import React from 'react';
import { pagination } from './store/api';
import './ButtonLoadMore.css';
function ButtonLoadMore({
  index,
  setIndex,
  setIsSubmited,
  loadMore,
  args,
  setIsResultPrio,
}) {
  const handleClick = () => {
    setIndex((prev) => prev + pagination);
    loadMore(args);
    setIsResultPrio(true);
  };

  return (
    <button className='load-more' onClick={handleClick}>
      Load more
    </button>
  );
}

export default ButtonLoadMore;

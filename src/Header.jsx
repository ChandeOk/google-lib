import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Header.css';
import { useLazyFetchBooksByCategoryQuery } from './store/api';
import { api } from './store/api';
import { pagination } from './store/api';
function Header({
  categories,
  query,
  setQuery,
  category,
  setCategory,
  isSubmited,
  setIsSubmited,
  order,
  setOrder,
  setIsResultPrio,
  isResultPrio,
  setIndex,
  setSelectedBookId,
}) {
  const [input, setInput] = useState('');
  const [getBooksByCat, booksByCat] = useLazyFetchBooksByCategoryQuery();
  const dispatch = useDispatch();
  console.log(isSubmited);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
    setQuery(input);
    setIsSubmited(true);
    console.log(isResultPrio);
    if (isResultPrio) dispatch(api.util.resetApiState());
    setIndex(pagination);
    setIsResultPrio(false);
    setSelectedBookId('');
  };

  useEffect(() => {
    if (!isSubmited) return;
    console.log('------------------------------------------');
    // getBooksByCat({ name: query, category, order }, true);

    setIsSubmited(false);
  }, [isSubmited]);

  return (
    <header>
      <form action='post' className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='search-input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className='selects-container'>
          <label htmlFor='categories'>
            Categories
            <select
              name='categories'
              id='categories'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((name, i) => (
                <option value={name} key={i}>
                  {name[0].toUpperCase() + name.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='sort-by'>
            Sorting by
            <select
              name='sort-by'
              id='sort-by'
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value='relevance'>Relevance</option>
              <option value='newest'>Newest</option>
            </select>
          </label>
          <button className='button-search' type='submit'>
            search
          </button>
        </div>
      </form>
    </header>
  );
}

export default Header;

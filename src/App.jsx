import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import BookCard from './BookCard';
import ButtonLoadMore from './ButtonLoadMore';
import Header from './Header';
import { ThreeDots } from 'react-loader-spinner';
import {
  api,
  useLazyFetchBooksByCategoryQuery,
  useLazyLoadMoreQuery,
} from './store/api';
import BookFullInfo from './BookFullInfo';

function App() {
  const [query, setQuery] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [isResultPrio, setIsResultPrio] = useState(false);
  const [categoriesArr, setCategoriesArr] = useState([
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
  ]);
  const [category, setCategory] = useState('all');
  const [isSubmited, setIsSubmited] = useState(false);
  const [sortType, setSortType] = useState('relevance');
  const [index, setIndex] = useState(30);
  console.log(index);

  const [getBooksByCat, booksByCat] = useLazyFetchBooksByCategoryQuery();
  const [loadMore, result] = useLazyLoadMoreQuery();

  useEffect(() => {
    if (!isSubmited) return;

    getBooksByCat({ name: query, category, order: sortType, index }, true);
    setSelectedBookId('');
  }, [isSubmited]);

  const findBookInfo = (bookId) => {
    console.log(isResultPrio);
    if (isResultPrio)
      return result.data.items.find((book) => book.id === bookId);

    return booksByCat.data.items.find((book) => book.id === bookId);
  };

  console.log(booksByCat);
  return (
    <div className='App'>
      <Header
        categories={categoriesArr}
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        isSubmited={isSubmited}
        setIsSubmited={setIsSubmited}
        order={sortType}
        setOrder={setSortType}
        index={index}
        setIsResultPrio={setIsResultPrio}
        isResultPrio={isResultPrio}
        setIndex={setIndex}
        setSelectedBookId={setSelectedBookId}
      ></Header>
      {selectedBookId === '' && (
        <main>
          {!booksByCat.isFetching &&
            !booksByCat.isUninitialized &&
            booksByCat.isSuccess &&
            booksByCat.data.items.map((book) => (
              <BookCard
                authors={book.volumeInfo.authors}
                title={book.volumeInfo.title}
                categories={book.volumeInfo.categories}
                image={book.volumeInfo.imageLinks?.thumbnail}
                id={book.id}
                key={book.id}
                setSelectedBookId={setSelectedBookId}
              />
            ))}
          {booksByCat.isFetching && (
            <div className='spinner'>
              <ThreeDots
                height='80'
                width='80'
                radius='9'
                color='#4fa94d'
                ariaLabel='three-dots-loading'
                wrapperStyle={{}}
                wrapperClassName=''
                visible={true}
              />
            </div>
          )}
          {isResultPrio &&
            !result.isUninitialized &&
            result.isSuccess &&
            result.data.items.map((book) => (
              <BookCard
                authors={book.volumeInfo.authors}
                title={book.volumeInfo.title}
                categories={book.volumeInfo.categories}
                image={book.volumeInfo.imageLinks?.thumbnail}
                id={book.id}
                key={book.id}
                setSelectedBookId={setSelectedBookId}
              />
            ))}
        </main>
      )}
      {selectedBookId === '' &&
        (booksByCat.isSuccess || result.isSuccess) &&
        !result.isFetching &&
        !booksByCat.isFetching && (
          <ButtonLoadMore
            index={index}
            setIndex={setIndex}
            setIsSubmited={setIsSubmited}
            loadMore={loadMore}
            args={{ name: query, category, order: sortType, index }}
            setIsResultPrio={setIsResultPrio}
          />
        )}
      {selectedBookId === '' && result.isFetching && (
        <ThreeDots
          height='80'
          width='80'
          radius='9'
          color='#4fa94d'
          ariaLabel='three-dots-loading'
          wrapperStyle={{ justifyContent: 'center' }}
          wrapperClassName=''
          visible={true}
        />
      )}
      {selectedBookId !== '' && (
        <BookFullInfo data={findBookInfo} bookId={selectedBookId} />
      )}
    </div>
  );
}

export default App;

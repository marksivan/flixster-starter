import './App.css'
import Search from './Search.jsx'
import Sort from './Sort.jsx'
import MovieList from './MovieList.jsx'
import {useState} from 'react'

function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    year: ''
  });

  function increasePageNumber() {
    setPage(page + 1);
  }

  function handleSearch(term) {
    setPage(1);
    setSearchTerm(term);
  }

  function handleSortChange(sortOption) {
    setSortBy(sortOption);
  }

  function handleFilterChange(filterOption) {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterOption.type]: filterOption.value
    }));
    setPage(1); // Reset to page 1 when filters change
  }

 return (
   <div className="App">
     <header className="App-header">
       <h1 className='title'>🎥 Flixster</h1>

       <div className='controls-row'>
         <Search onSearch={handleSearch}/>
         <Sort
           onSortChange={handleSortChange}
           onFilterChange={handleFilterChange}
         />
       </div>
     </header>

     <main>
       <div className='movie-container'>
         <MovieList
           page={page}
           searchTerm={searchTerm}
           sortBy={sortBy}
           filters={filters}
         />
       </div>
       <div className='load-more'>
         <button onClick={increasePageNumber}>Load More</button>
         <p>Page {page}</p>
       </div>
     </main>

     <footer>
       <div className='App-footer'>
         <p>© 2025 MST</p>
       </div>
     </footer>
   </div>
 )
}

export default App;

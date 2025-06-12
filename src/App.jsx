import './App.css'
import Search from './Search.jsx'
import Sort from './Sort.jsx'
import MovieList from './MovieList.jsx'
import {useState} from 'react'


function App() {
  const [page, setPage] = useState(1)

  const [searchTerm, setSearchTerm] = useState('')

  function increasePageNumber() {
    setPage(page + 1)
  }

  function handleSearch(term) {
    setPage(1)
    setSearchTerm(term)
  }

 return (
   <div className="App">                           
     <header className="App-header">
       <h1 className='title'>🎥 Flixster</h1>


     <div className='controls-row'>
       <Search onSearch = {handleSearch}/>
       <Sort/>
     </div>


     </header>


     <main>
       <div className='movie-container'>
         <MovieList page = {page} searchTerm={searchTerm}/>
       </div>
       <div className='load-more'>
         <button onClick={increasePageNumber}>Load More</button>
         <p>Page {page}</p>


       </div>


     </main>




     <footer>
       <div className='App-footer'>
         <p>Footer</p>
       </div>
     </footer>


   </div>
 )
}

export default App;

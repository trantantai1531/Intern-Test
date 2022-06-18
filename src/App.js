import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import './styles/App.css';
import rating from './images/rating.png';
import time from './images/clock.png'
import Header from './components/header';
import Modal from './components/modal';
import Footer from './components/footer';
import './styles/StylesSheet.css'
import { settings } from './components/SlickSettings'
import { GenreList } from './components/GenreList'
import MovieList from './components/MovieList';
function App() {

  const [searchTerm, setSearchTerm] = useState(0);

  const [sortBy, setSortBy] = useState("date_added");

  const [movies, setmovies] = useState([]);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [genre, setGenre] = useState('all');

  const [isOpen, setIsOpen] = useState(false);

  const [movieId, setMovieId] = useState(0);

  useEffect(() => {
    axios(`https://yts.torrentbay.to/api/v2/list_movies.json?limit=30&&query_term=${searchTerm}&&genre=${genre}&&sort_by=${sortBy}&&page=${page}`).then(res => {
      const result = res.data.data;
      console.log(result);
      setmovies(result.movies);
      setPageCount(Math.floor(result.movie_count / result.limit) + 1);
      console.log(pageCount);
    })
  }, [page, sortBy, searchTerm, genre, isOpen]);

  const handleModalOpen = (e) => {
    setMovieId(e.target.id);
    setIsOpen(true);
  }

  const handleModalClose = (event) => {
    event.stopPropagation();
    setIsOpen(false);
    console.log(isOpen);
  }

  const handleNextClick = () => {
    setPage((prev) => prev === pageCount ? 1 : prev + 1);
  };

  const handlePrevClick = () => {
    setPage((prev) => prev === 1 ? pageCount : prev - 1);
  };

  const handleSortByClick = (e) => {
    setPage(1);
    setSortBy(e.target.value);
  }

  const handleGenreClick = (e) => {
    setPage(1);
    setGenre((prev) => prev === 'all' ? e.target.innerText : 'all');
  }

  const handleQuerySubmit = (e) => {
    e.preventDefault();
  };

  const handleQueryChangle = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">

      <Header
        query={searchTerm}
        handleChange={handleQueryChangle}
        handleSubmit={handleQuerySubmit}
      />
      <div>
        <Slider {...settings}>
          {GenreList.map((item, key) => {
            return (
              <div className={"Rectangle-2068-copy-4 Text-Style-29" + (item === genre ? " red" : "")} key={key} onClick={handleGenreClick}>{item}</div>
            );
          })}

        </Slider>
      </div>
      <div className='list_button'>
        <span className='left'>
          <p className='item1 Text-Style-29'>Movie pick</p>
          <button value="date_added" onClick={handleSortByClick}>Latest</button>
          <button value="download_count" onClick={handleSortByClick}>Recommended</button>
        </span>
        <span className='right'>Selection Criteria</span>
      </div>


      <div className='movie-list'>
        {!movies ? (<p>Loading..</p>) : (
          movies.map((item, key) => {
            return (<MovieList item={item} id={key} handleModalOpen={handleModalOpen} />);

          })
        )
        }
        {!movies ? "" : <Modal open={isOpen} onClose={handleModalClose} nextMovie={() => setMovieId((prev) => prev == 29 ? 0 : parseInt(prev) + 1)} prevMovie={() => setMovieId((prev) => prev == 0 ? 29 : parseInt(prev) - 1)} item={movies[movieId]} />}
      </div>
      <div className='nav-button'>
        <button className='button-12 prev' onClick={handlePrevClick}>Prev</button>
        <button className='button-12 next' onClick={handleNextClick}>Next</button>
      </div>

      <Footer />
    </div>
  );
}

export default App;

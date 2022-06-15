import React from 'react';
import rating from '../images/rating.png';
import time from '../images/clock.png';
function MovieList({item, id, handleModalOpen}) {

            return (

              <div className='movie-container' key={id}>          
                <div className='image-container' id={id} onClick={handleModalOpen}>
                  <img className='movie-background-image'  src={item.background_image} alt={item.title + " background image"} />
                  
                </div>
                
                <div className='detail'>
                  <span>{item.title}</span>
                  <span className='right'><img alt="star" className='detail-icon' src={rating} />{item.rating} <img alt='clock' className='detail-icon' src={time} />{Math.floor(item.runtime / 60) + "h" + item.runtime % 60 + 'm'}</span>

                </div>
              </div>
            );
            }
export default MovieList;

import React from 'react';
import ReactDom from 'react-dom';
import '../styles/modal.css'
export default function Modal({ open, item, onClose, nextMovie, prevMovie }) {

  if (!open) return null;
  return ReactDom.createPortal(
    
    <>
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <div className='info-container'>
          <div className='info'>
            <div className='item1 Text-Style-19'>{item.title}</div>
            <div className='item2'>{item.year}</div>
            <div className='item3'>{item.rating + "/10 - " + Math.floor(item.runtime / 60) + "h" + item.runtime % 60 + 'm'}</div>
          </div>

          <div className='genre-container'>
            {item.genres.map((genre) => {
              return (<div className='genre'>{genre}</div>);
            })}
          </div>

        </div>

        <div className='horizontal-rule' />
        {item.yt_trailer_code === "" ? <img alt="large_cover" src={item.large_cover_image} /> :
          <iframe
            title={item.yt_trailer_code}
            src={"https://www.youtube.com/embed/" + item.yt_trailer_code}>
          </iframe>
        }


        <div className='summary'>
          {item.summary}
        </div>

        <img alt='cover_1' src={"https://yts.torrentbay.to/s__img/assets/images/movies/" + item.slug.toLowerCase().split("-").join("_") + "/medium-screenshot1.jpg"} />

        <img alt='cover_2' src={"https://yts.torrentbay.to/s__img/assets/images/movies/" + item.slug.toLowerCase().split("-").join("_") + "/medium-screenshot2.jpg"} />

        <img alt='cover_3' src={"https://yts.torrentbay.to/s__img/assets/images/movies/" + item.slug.toLowerCase().split("-").join("_") + "/medium-screenshot3.jpg"} />

        
      </div>
      <button className='button close' onClick={onClose}>X</button>
      <button className='button next' onClick={nextMovie}>ᐳ</button>
      <button className='button prev' onClick={prevMovie}>ᐸ</button>
    </>,
    document.getElementById('portal')
  )
}


import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const GalleryWithMenu = ({ data }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="gallery-with-menu-container">
      <div className="photo-gallery">
        <figure>
          <div
            className="figure-images"
            style={{
              transform: `translateX(-${activeItem * 100}%)`,
            }}
          >
            {
              data
                .map((item, index) => (
                  <div className="wrapper" key={`photo-${index}`}>
                    <LazyLoadImage src={item.image} alt={item.image} />
                  </div>
                ))
            }
          </div>

          <div
            className="figcaptions"
            style={{
              transform: `translateX(-${activeItem * 100}%)`,
            }}
          >
            {
              data.map((item, index) => (
                <figcaption key={`figcaption-${index}`}>
                  <h3>{item.contentTitle}</h3>
                  <p>{item.content}</p>
                </figcaption>
              ))
            }
          </div>
        </figure>
      </div>
      <div className="menu">
        <a className="menu-item arrow" role="presentation" onClick={() => setActiveItem(activeItem > 1 ? activeItem - 1 : 0)}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.7509 17.2354L39.6542 31.9781C40.0207 32.3406 40.6086 32.3406 40.9751 31.9781C41.3416 31.6155 41.3416 31.034 40.9751 30.6714L25.4079 15.2719C25.0413 14.9094 24.4535 14.9094 24.087 15.2719L8.52663 30.6714C8.34682 30.8493 8.25 31.0887 8.25 31.3213C8.25 31.5539 8.3399 31.7934 8.52663 31.9712C8.89316 32.3338 9.48099 32.3338 9.84753 31.9712L24.7509 17.2354Z" fill="#12233D" />
          </svg>
        </a>
        {data.map(({
          title, logo, contentTitle, content, image,
        }, index) => (
          <a className="menu-item" key={`menu-item-${index}`} role="presentation" onClick={() => setActiveItem(index)}>
            <input
              type="radio"
              name
              id={`menu-item-${index}`}
              checked={activeItem === index ? 'checked' : ''}
              key={`input-${index}`}
              onChange={() => { }}
            />
            <label htmlFor={`menu-item-${index}`} key={`label-${index}`}>
              <img src={logo} alt={logo} />
              <p>{title}</p>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3743 25.6372L6.95483 13.3516C6.64939 13.0495 6.15953 13.0495 5.85408 13.3516C5.54864 13.6538 5.54864 14.1383 5.85408 14.4405L18.8268 27.2734C19.1322 27.5755 19.6221 27.5755 19.9275 27.2734L32.8945 14.4405C33.0443 14.2923 33.125 14.0927 33.125 13.8989C33.125 13.7051 33.0501 13.5055 32.8945 13.3573C32.589 13.0552 32.0992 13.0552 31.7937 13.3573L19.3743 25.6372Z" fill="#12233D" />
              </svg>
            </label>
            <div className="mobile-container">
              <LazyLoadImage src={image} alt={image} />
              <figcaption>
                <h3>{contentTitle}</h3>
                <p>{content}</p>
              </figcaption>
            </div>
          </a>
        ))}
        <a className="menu-item arrow" role="presentation" onClick={() => setActiveItem(activeItem < data.length - 1 ? activeItem + 1 : data.length - 1)}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2491 30.7646L8.3458 16.0219C7.97927 15.6594 7.39143 15.6594 7.0249 16.0219C6.65837 16.3845 6.65837 16.966 7.0249 17.3286L22.5921 32.7281C22.9587 33.0906 23.5465 33.0906 23.913 32.7281L39.4734 17.3286C39.6532 17.1507 39.75 16.9113 39.75 16.6787C39.75 16.4461 39.6601 16.2066 39.4734 16.0288C39.1068 15.6662 38.519 15.6662 38.1525 16.0288L23.2491 30.7646Z" fill="#12233D" />
          </svg>
        </a>
      </div>
    </div>
  );
};

GalleryWithMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GalleryWithMenu;

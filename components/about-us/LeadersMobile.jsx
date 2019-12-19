import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

const LeadersMobile = ({ data }) => {
  const [step, setStep] = useState(0);

  const handleScroll = ({ target: { scrollLeft, clientWidth, scrollWidth } }) => {
    const scrollPercentage = Math.round(
      ((scrollLeft + clientWidth) / scrollWidth) * 100,
    );
    let toStep = 0;
    times(5, (index) => {
      let computedPercentage = scrollPercentage;
      if (index === 0) {
        computedPercentage = Math.round(
          (scrollLeft / scrollWidth) * 100,
        );
      }
      if (computedPercentage > (index + 1) * 20) {
        toStep += 1;
      }
    });
    setStep(toStep);
  };
  const gallery = useRef(null);
  useEffect(() => {
    if (gallery && gallery.current) {
      gallery.current.addEventListener('scroll', handleScroll);
    }

    return () => gallery.removeEventListener('scroll', handleScroll);
  }, [gallery]);

  return (
    <>
      <div className="gallery mobile" ref={gallery}>
        <div className="gallery-inner">
          {
            data.map((item, index) => (
              <figure key={index}>
                <div className="wrapper">
                  <img
                    src={`static/images/about-us/leaders/${item.picture}.jpg`}
                    alt={item.name}
                  />
                  <div className="overlay">
                    <a href={item.email}>Send an email</a>
                    <a href={item.linkedin}>LinkedIn</a>
                  </div>
                </div>

                <figcaption>
                  <h3>{item.name}</h3>
                  <p>{item.position}</p>
                </figcaption>
              </figure>
            ))
          }
        </div>
      </div>

      <ul className="values-toggler">
        {
          data.map((_, i) => (
            <li
              key={i}
              className={i <= step ? 'active' : ''}
            />
          ))
        }
      </ul>
    </>
  );
};

LeadersMobile.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LeadersMobile;

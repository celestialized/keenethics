import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function FeaturesList({ list, titleItalic, titleBold }) {
  const titleStyle = {};
  if (titleItalic) {
    titleStyle.fontStyle = 'italic';
  }
  if (titleBold) {
    titleStyle.fontWeight = '600';
  }

  return (
    <ul className="features-icons--list">
      {
        list.map(({
          icon,
          alt,
          description,
          additionalText,
        },
        key) => (
          <li key={key} className="features-icons--item">
            <figure className="features-icons--figure">
              {icon && <LazyLoadImage src={icon} alt={alt} className="features-icons--img" />}
              <figcaption className="features-icons--figcaption" style={titleStyle}>
                {description}
              </figcaption>
            </figure>
            {additionalText && <div className="features-additional-text" style={icon ? null : { marginTop: '15px' }}>{additionalText}</div> }
          </li>
        ))
      }
    </ul>
  );
}
FeaturesList.propTypes = {
  list: PropTypes.array.isRequired,
  titleItalic: PropTypes.bool,
  titleBold: PropTypes.bool,
};
FeaturesList.defaultProps = {
  titleItalic: false,
  titleBold: false,
};

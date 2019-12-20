import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';

const platesContent = [
  {
    icon: 'icon-web.svg',
    text: 'Web Development',
    href: 'services-web-development',
  },
  {
    icon: 'icon-mobile.svg',
    text: 'Mobile Development',
    href: 'services-mobile-development',
  },
  {
    icon: 'icon-mvp.svg',
    text: 'Minimum Viable Product',
    href: 'approach-minimum-viable-product',
  },
  {
    icon: 'icon-pwa.svg',
    text: 'PWA Development',
    href: 'tech-apps-progressive-web-apps',
  },
  {
    icon: 'icon-team.svg',
    text: 'Staff Augmentation',
    href: 'services-dedicated-development-team',
  },
  {
    icon: 'icon-cloud.svg',
    text: 'Cloud Appliction Development Service',
    href: 'services-cloud-application-development',
  },
  {
    icon: 'icon-ai.svg',
    text: 'Chatbots & AI Development',
    href: 'services-chatbots-artificial-intelligence',
  },
  {
    icon: 'icon-iot.svg',
    text: 'Internet of Things Development Services',
    href: 'services-internet-of-things',
  },

];

const OurServices = ({ show }) => (
  <div className="block block-our-services">
    <header className="block--header">
      <div className="block--header-title">
        Our services
      </div>
      <div className="block--header-description">
        You can rely on us to cover any product development need you have.
        We are sure to contribute to the success of your solution no matter what the task.
      </div>
    </header>
    <div className="block--content our-services">
      <div className={classnames('home-section-plates', {
        'fade-in-timed-out': show,
      })}
      >
        {platesContent.map((el) => (
          <Link href={el.href} key={el.text}>
            <div className="home-section-plates-item">
              <img className="plate-img" src={`/static/images/svg/home/services/${el.icon}`} alt="service icon" />
              <p className="plate-text">{el.text}</p>
            </div>
          </Link>
        ))}
        <div className="plates-grid horizontal" />
        <div className="plates-grid start" />
        <div className="plates-grid mid" />
        <div className="plates-grid end" />
      </div>
    </div>
  </div>
);

OurServices.propTypes = {
  show: PropTypes.bool,
};

OurServices.defaultProps = {
  show: false,
};

export default OurServices;
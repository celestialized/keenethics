import { withRouter } from 'next/router';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Layout from '../components/layout/main';
import Background from '../components/content/background';
import EstimateForm from '../components/contacts/estimate-form';
import ContactForm from '../components/contacts/contact-form';
import Notify from '../components/notify/notify';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    const { query } = props.router;

    this.state = {
      isPending: false,
      status: '',
      activeContactForm: query.activeForm !== 'estimate',
      notifyIsVisible: false,
      notifyMessage: null,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick({ target }) {
    this.setState({
      activeContactForm: target.name === 'contact-form-btn',
    });
  }

  render() {
    const {
      activeContactForm,
      isPending,
      status,
      notifyIsVisible,
      notifyMessage,
    } = this.state;

    return (
      <Layout>
        {notifyIsVisible && (
          <Notify
            notifyMessage={notifyMessage}
            updateState={(state) => this.setState(state)}
          />
        )}
        <div className="contacts-page">
          <div className="contacts-socket">
            <div className="title-page">
              <h1 className="title">Contact Us</h1>
            </div>
            <div className={activeContactForm ? 'contacts-block' : 'estimate-block-background'} itemScope itemType="http://schema.org/Organization">
              <ul className="contacts-stars">
                <li />
                <li />
                <li />
                <li />
              </ul>
              {activeContactForm ? <div className="contacts-mail" /> : <div className="contacts-file" />}
              <button
                onClick={this.onClick}
                name="contact-form-btn"
                className={classnames(
                  'contacts-form-btn contact-form-btn',
                  {
                    disabled: !activeContactForm,
                  },
                )}
                type="button"
              >
                Say Hello
              </button>
              <button
                onClick={this.onClick}
                name="estimate-form-btn"
                className={classnames(
                  'contacts-form-btn estimate-form-btn',
                  {
                    disabled: activeContactForm,
                  },
                )}
                type="button"
              >
                Estimate your project
              </button>
              <address>
                <ul className="contacts-list">
                  <li itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <a href="https://goo.gl/maps/eaAU8qqLZoo" rel="noopener noreferrer nofollow" target="_blank">
                      <img width="15" src="/static/images/svg/con-map.svg" alt="location" className="ico" />
                      <div itemProp="streetAddress">Kulparkivska St, 59</div>
                      <span>
                        <span itemProp="addressLocality" style={{ display: 'inline' }}>Lviv</span>
                        ,&nbsp;
                        <span itemProp="addressRegion" style={{ display: 'inline' }}>Ukraine</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+380968147266">
                      <img width="15" src="/static/images/svg/con-tel.svg" alt="Call" className="ico" />
                      <div itemProp="telephone">+38 (096) 814 72 66</div>
                      <span>Give Us a Call</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:business@keenethics.com">
                      <img width="15" src="/static/images/svg/con-mail.svg" alt="email" className="ico" />
                      <div>business@keenethics.com</div>
                      <span>Drop Us a Letter</span>
                    </a>
                  </li>
                </ul>
              </address>
              { this.state.activeContactForm ? (
                <ContactForm
                  isPending={isPending}
                  status={status}
                  updateState={(state) => this.setState(state)}
                />
              ) : (
                <EstimateForm
                  isPending={isPending}
                  status={status}
                  updateState={(state) => this.setState(state)}
                />
              )}
            </div>
          </div>
          <Background />
        </div>
      </Layout>
    );
  }
}

Contacts.propTypes = {
  router: PropTypes.object,
};
Contacts.defaultProps = {
  router: {},
};

export default withRouter(Contacts);

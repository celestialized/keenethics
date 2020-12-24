import React, { useState, useContext } from 'react';
import * as Sentry from '@sentry/browser';
import classnames from 'classnames';
import ReactGA from 'react-ga';
import { ContactUsContext } from '../context/contacts-context';
import Person from '../person';
import Checkbox from '../form/checkbox';
import { IlonaS, PaulW, JeanA } from '../../public/static/contacts/contacts-data';

const handleStatusResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const ContactForm = () => {
  const {
    isPending,
    setIsPending,
    setStatus,
    setNotifyMessage,
    selectedCountry,
    file,
    setFile,
  } = useContext(ContactUsContext);
  let person;
  if (selectedCountry === 'NL') person = PaulW;
  else if (selectedCountry === 'US') person = JeanA;
  else person = IlonaS;
  const [firstname, setFirstname] = useState({
    value: '',
    error: false,
  });
  const [email, setEmail] = useState({
    value: '',
    error: false,
  });
  const [message, setMessage] = useState({
    value: '',
    error: false,
  });
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [hasDiscount] = useState(false);

  const setInitialState = () => {
    setFirstname({ value: '', error: false });
    setEmail({ value: '', error: false });
    setMessage({ value: '', error: false });
    setFile({ value: '', error: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ReactGA.ga(
      'send',
      'event',
      'Leadgen',
      'submit',
      email.value,
    );
    setIsPending(true);

    Sentry.setTag('email', email.value);
    Sentry.setTag('firsName', firstname.value);
    Sentry.captureEvent({
      message: 'Contact us',
      level: 'info',
      extra: {
        leadMessage: message.value,
      },
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({
      firstname,
      email,
      message,
      lastname: { value: 'mockedLastname', error: '' },
      phone: { value: '123456789', error: '' },
      isSubscriber,
      hasDiscount,
      selectedCountry,
    }));

    fetch('/contact', {
      method: 'POST',
      body: formData,
    })
      .then(handleStatusResponse)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.errorField) {
          setNotifyMessage(json.status.toString());
          if (json.errorField === 'firstname') setFirstname(json);
          if (json.errorField === 'email') setEmail(json);
          if (json.errorField === 'message') setMessage(json);
          if (json.errorField === 'file') setFile(json);
        }

        setIsPending(false);
        setStatus(json.status.toString());

        if (json.status.toString() === 'Message sent') {
          setInitialState();
        }
      })
      .catch((err) => Sentry.captureException(err));
  };
  return (
    <div className="contacts-form">
      <form onSubmit={onSubmit}>
        {Person({
          ...person,
          wrapperClassnames: 'display-flex-md',
        })}
        <div className="input-cols">
          <div className="input-wrap">
            <input
              className={classnames({ error: firstname.error })}
              name="firstname"
              id="firstname"
              type="text"
              onChange={(event) => {
                setFirstname({
                  value: event.target.value,
                  error: '',
                });
              }}
              required
              value={firstname.value}
            />
            <span className="highlight" />
            <label htmlFor="firstname">Name</label>
          </div>
          <div className={firstname.errorField ? 'error-message' : 'error-none'}>
            {firstname.status}
          </div>
        </div>
        <div className="input-cols">
          <div className="input-wrap">
            <div className="input-email">
              <input
                className={classnames({ error: email.error })}
                name="email"
                id="email"
                type="email"
                onChange={(event) => {
                  setEmail({
                    value: event.target.value,
                    error: '',
                  });
                }}
                required
                value={email.value}
              />
              <span className="highlight" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className={email.errorField ? 'error-message' : 'error-none'}>
            {email.status}
          </div>
        </div>
        <div className="input-wrap">
          <textarea
            className={classnames({
              'message-textarea': true,
              error: message.error,
            })}
            name="message"
            placeholder="Your message &#10;(project description)"
            onChange={(event) => {
              setMessage({
                value: event.target.value,
                error: '',
              });
            }}
            value={message.value}
          />
        </div>
        <div className={message.errorField ? 'error-message' : 'error-none'}>
          {message.status}
        </div>
        <div className="grey-checkbox-wrapper">
          <Checkbox
            className="grey"
            text={(
              <>
                I want to join KeenEthics in a social project like&nbsp;
                <a
                  href="https://letkidsmove.org/en"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="grey sub-dis"
                >
                  Let Kids Move
                </a>
              </>
            )}
            name="estimateFormIsSubscriber"
            id="estimateFormIsSubscriber"
            value="estimateFormIsSubscriber"
            onChange={() => {
              setIsSubscriber(!isSubscriber);
            }}
            isChecked={isSubscriber}
          />
        </div>
        <div className="submit-btn">
          <button
            type="submit"
            className={
              isPending ? 'button button-send pending' : 'button button-send'
            }
          >
            Let&apos;s talk
          </button>
        </div>
        <div className="privacy-policy">
          By submitting, I agree to KeenEthics’&nbsp;
          <a href="/privacy-policy" target="_blank">Privacy Policy</a>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

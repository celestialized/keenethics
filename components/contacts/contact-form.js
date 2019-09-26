import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { ContactUsContext } from '../context/contacts-context';
import Person from '../person';
import Checkbox from '../form/checkbox';

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
  } = useContext(ContactUsContext);

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
  const [hasDiscount, setHasDiscount] = useState(false);

  const setInitialState = () => {
    setFirstname({ value: '', error: false });
    setEmail({ value: '', error: false });
    setMessage({ value: '', error: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        email,
        message,
        lastname: { value: 'mockedLastname', error: '' },
        phone: { value: '123456789', error: '' },
        isSubscriber,
        hasDiscount,
      }),
    })
      .then(handleStatusResponse)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.errorField) {
          setNotifyMessage(json.status.toString());
        }

        setIsPending(false);
        setStatus(json.status.toString());

        if (json.status.toString() === 'Message sent') {
          setInitialState();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="contacts-form">
      <form onSubmit={onSubmit}>
        {Person({
          name: 'Talk to Max Savonin',
          position: 'CEO at KeenEthics',
          imgSrc: 'static/images/max_savonin.png',
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
        </div>
        <div className="input-wrap">
          <textarea
            required
            className={classnames({
              'message-textarea': true,
              error: message.error,
            })}
            name="message"
            placeholder="Your message"
            onChange={(event) => {
              setMessage({
                value: event.target.value,
                error: '',
              });
            }}
            value={message.value}
          />
        </div>
        <div className="grey-checkbox-wrapper">
          <Checkbox
            className="grey"
            text="I am a subscriber."
            name="contactFormIsSubscriber"
            id="contactFormIsSubscriber"
            value="contactFormIsSubscriber"
            onChange={() => {
              setIsSubscriber(!isSubscriber);
            }}
            isChecked={isSubscriber}
          />
          <Checkbox
            className="grey"
            text="I have a discount."
            secondaryText="(Please, specify in your message)."
            name="contactFormHasDiscount"
            id="contactFormHasDiscount"
            value="contactFormHasDiscount"
            onChange={() => {
              setHasDiscount(!hasDiscount);
            }}
            isChecked={hasDiscount}
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
      </form>
    </div>
  );
};

export default ContactForm;

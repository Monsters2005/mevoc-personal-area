import React from 'react';
import s from './Cookies.module.scss';
import cookies from '../../../assets/images/cookies.png';

export default function Cookies() {
  return (
    <div className={s.cookies_container}>
      <div className={s.cookies_header}>
        <img src={cookies} alt="cookies" />
        <h3>We use cookies</h3>
      </div>
      <p>
        This website is using cookies to ensure you get the best personalized
        experience. Cookies are neccessary to save the data for the usage.
      </p>
    </div>
  );
}

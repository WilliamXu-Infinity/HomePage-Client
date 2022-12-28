import { setCookie, getCookie } from 'react-cookie';
import { useCookies } from 'react-cookie';

const setCookieWithDuration = (name, value, duration = 30) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + duration);

  setCookie(name, value, { expires: expirationDate });
}

const getUserFromCookie = () => getCookie('userId')

export const setUserIntoCookie = (value, duraction = 30) => setCookieWithDuration('userId', value, duraction)

export default getUserFromCookie
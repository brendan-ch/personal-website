import axios from 'axios';

/**
 * Verifies the captcha code provided by the client.
 * @param response
 */
export default async function verifyCaptcha(response: string, secret: string) {
  const url = `https://www.google.com/recaptcha/api/siteverify?response=${response}&secret=${secret}`;

  const result = await axios.post(url, {}, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
  });

  return result.data.success && result.data.score > 0.5;
}
import type { NextApiRequest, NextApiResponse } from 'next';
import getPage from '../../../helpers/getPage';
import verifyCaptcha from '../../../helpers/verifyCaptcha';
import { PageQuery, Response } from '../../../types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { CAPTCHA_SECRET } = process.env;
  if (!CAPTCHA_SECRET) {
    return res.status(500).json({
      successful: false,
      error: 'Incomplete environment variables provided. Please contact the site administrator.',
    });
  }

  try {
    // Share interface with code
    const query: PageQuery = req.body;
    delete query.withContent;

    // Validate
    if (
      !query
      || (typeof query.id !== 'string'
      || !['string', 'undefined'].includes(typeof query.prefix)
      || !['boolean', 'undefined'].includes(typeof query.withContent))
    ) {
      const captchaVerification = await verifyCaptcha(req.body['g-recaptcha-response'], CAPTCHA_SECRET);
      if (!captchaVerification) {
        return res.status(400).json({
          successful: false,
          error: 'Invalid reCAPTCHA response provided.',
        });
      }

      // 400 error
      const error400: Response = {
        successful: false,
        error: 'Invalid request. Double check the request body and try again.',
      };
      // Return 400 error
      return res.status(400).json(error400);
    }

    const pageData = await getPage(query);
    
    const response: Response = {
      successful: true,
      data: {
        ...pageData,
      },
    };

    return res.status(200).json(response);
  } catch(e) {
    const error500: Response = {
      successful: false,
      error: 'Internal server error.',
    };

    return res.status(500).json(error500);
  }
}
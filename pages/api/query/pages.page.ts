import type { NextApiRequest, NextApiResponse } from 'next';
import { PAGINATION_LIMIT } from '../../../helpers/Constants';
import getPages from '../../../helpers/getPages';
import verifyCaptcha from '../../../helpers/verifyCaptcha';
import { PageListQuery, Response } from '../../../types';

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { CAPTCHA_SECRET } = process.env;
  if (!CAPTCHA_SECRET) {
    return res.status(500).json({
      successful: false,
      error: 'Incomplete environment variables provided. Please contact the site administrator.',
    });
  }

  try {
    const captchaVerification = await verifyCaptcha(req.body['g-recaptcha-response'], CAPTCHA_SECRET, 0.2);
    if (!captchaVerification) {
      return res.status(400).json({
        successful: false,
        error: 'Invalid reCAPTCHA response provided.',
      });
    }

    // Share interface with code
    const query: PageListQuery = req.body;

    // Validate
    if (
      !query
      || !['string', 'undefined'].includes(typeof query.prefix)
    ) {
      // 400 error
      const error400: Response = {
        successful: false,
        error: 'Invalid request. Double check the request body and try again.',
      };
      // Return 400 error
      return res.status(400).json(error400);
    }
    
    // Restrict pagination size for API users
    const pages = await getPages({
      ...query,
      pageSize: query.pageSize ? Math.min(PAGINATION_LIMIT, query.pageSize) : undefined,
    });

    const response: Response = {
      successful: true,
      data: pages,
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
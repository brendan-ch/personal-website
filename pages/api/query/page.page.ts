import type { NextApiRequest, NextApiResponse } from 'next';
import getPage from '../../../helpers/getPage';
import { PageQuery, Response } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
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
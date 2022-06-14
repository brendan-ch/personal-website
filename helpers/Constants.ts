/**
 * @todo move these values to environment variables
 */
export const PROJECTS_DATABASE_ID = '8bfa473991634d7885873cf269746b41';
export const ABOUT_PAGE_ID = 'd5f92ee0527143c7b596b28b49e03937';

/**
 * Controls when to regenerate a static page.
 * Only works in production.
 * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
 */
export const REVALIDATE = 30;

/**
 * Controls how many items are returned from a database
 * or page at a time. Maximum size is 100.
 * @see https://developers.notion.com/reference/pagination
 */
export const PAGE_SIZE = 50;

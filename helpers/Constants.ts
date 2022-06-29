/**
 * AWS region.
 */
export const REGION = 'us-west-1';

export const BUCKET_NAME = 'bchen-personal-website';

/* Colors */
export const RED = '#BE3223';
export const BLUE = '#5D5CB2';
export const CYAN = '#376E77';

/**
 * Maximum depth that the `getChildrenBlocks` function can recurse to.
 */
export const MAX_RECURSION_DEPTH = 5;

/**
 * @todo move these values to environment variables
 */
export const PROJECTS_DATABASE_ID = '8bfa473991634d7885873cf269746b41';
export const ADDITIONAL_DOCS_DATABASE_ID = '475cc85e2ecf416eb4a816feba2a7f26';
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

/**
 * Value between 1 and 64 to supply to `getPlaiceholder`.
 * Determines the size of the placeholder image.
 * 
 * @see https://plaiceholder.co/docs/usage
 */
export const PLACEHOLDER_SIZE = 32;
import path from 'path';

export const GITHUB_LINK = 'https://github.com/brendan-ch';
export const LINKEDIN_LINK = 'https://linkedin.com/in/brendan-ch';

/**
 * Tags to always exclude from `getTags` function.
 */
export const EXCLUDED_TAGS = ['Featured'];

/**
 * Maximum number of items that can appear at a time
 * when using client-side rendering.
 */
export const GROUP_PAGE_SIZE = 16;

/**
 * Maximum number of items that can be returned from a `getPages` call
 * (using the public API)
 */
export const PAGINATION_LIMIT = 16;

/**
 * Full path of the content directory.
 */
export const CONTENT_DIRECTORY = path.join(process.cwd(), 'content');

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
 * @deprecated Plaiceholder no longer used for generation.
 */
export const PLACEHOLDER_SIZE = 32;
/**
 * Represents a database item from Notion.
 * Only the `title` and `id` keys are guaranteed to be in the object.
 * The rest are dependent on the structure of each database.
 */
interface DatabaseItem {
  title: string,
  id: string,
  prettyLink?: string,
  imageLink?: string,
  coverImageLink?: string,
  description?: string,
  tags?: string[],
}

/**
 * Schema for the `Additional Documents` database.
 */
// interface DocumentDatabaseItem extends DatabaseItem {
// }

// /**
//  * Schema for the `Projects` databsae.
//  */
// interface ProjectDatabaseItem extends DatabaseItem {
  
// }

interface DatabaseDropdownFilter {
  /**
   * The name that appears in the dropdown menu.
   */
  dropdownName: string,
  /**
   * The name of the tag to filter.
   * If undefined, no tag filter will be applied.
   */
  tagName?: string,
  type: 'gallery' | 'list',
}

type NavigationSelected = 'Projects' | 'About Me';

/**
 * Database item with updated preview image.
 */
interface UpdatedDatabaseItem {
  imageLink?: string,
  coverImageLink?: string,
  /**
   * Notion page ID to update.
   */
  pageId: string,
}

interface UpdatedBlockItem {
  imageLink: string,
  caption: any[],
  blockId: string,
}

export {
  NavigationSelected,
  DatabaseDropdownFilter,
  DatabaseItem,
  UpdatedDatabaseItem,
  UpdatedBlockItem,
};
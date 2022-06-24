interface DatabaseItem {
  title: string,
  id: string,
  prettyLink?: string,
  imageLink?: string,
  imageName?: string,
}

/**
 * Schema for the `Additional Documents` database.
 */
interface DocumentDatabaseItem extends DatabaseItem {
}

/**
 * Schema for the `Projects` databsae.
 */
interface ProjectDatabaseItem extends DatabaseItem {
  description?: string,
  tags: string[],
}

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
  imageLink: string,
  imageName: string,
  /**
   * Notion page ID to update.
   */
  pageId: string,
}

interface UpdatedBlockItem {
  imageLink: string,
  imageName: string,
  blockId: string,
}

export {
  NavigationSelected,
  ProjectDatabaseItem,
  DocumentDatabaseItem,
  DatabaseDropdownFilter,
  DatabaseItem,
  UpdatedDatabaseItem,
  UpdatedBlockItem,
};
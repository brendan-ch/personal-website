/**
 * Schema for the `Additional Documents` database.
 */
interface DocumentDatabaseItem {
  title: string,
  /**
   * Notion database ID of the item.
   */
  id: string,
  prettyLink?: string,
}

/**
 * Schema for the `Projects` databsae.
 */
interface ProjectDatabaseItem {
  title: string,
  description?: string,
  prettyLink?: string,
  imageLink?: string,
  /**
   * Notion database ID of the item.
   */
  id: string,
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

export {
  NavigationSelected,
  ProjectDatabaseItem as DatabaseItem,
  DocumentDatabaseItem,
  DatabaseDropdownFilter,

};
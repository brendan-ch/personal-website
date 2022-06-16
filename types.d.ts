interface DatabaseItem {
  title: string,
  description?: string,
  imageLink?: string,
  imagePosX?: number,
  imagePosY?: number,
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
   */
  tagName: string,
  type: 'gallery' | 'list',
}

type NavigationSelected = 'Projects' | 'About Me';

export { NavigationSelected, DatabaseItem, DatabaseDropdownFilter };
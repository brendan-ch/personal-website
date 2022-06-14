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

type NavigationSelected = 'Projects' | 'About Me';

export { NavigationSelected, DatabaseItem };
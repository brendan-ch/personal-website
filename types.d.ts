interface DatabaseItem {
  title: string,
  description: string,
  imageLink: string | null,
  imagePosX: number | null,
  imagePosY: number | null,
  /**
   * Notion database ID of the item.
   */
  id: string,
  tags: string[],
}

type NavigationSelected = 'Projects' | 'About Me';

export { NavigationSelected, DatabaseItem };
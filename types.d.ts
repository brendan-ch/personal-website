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

type SupportedBlockType = 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'toggle'
  | 'image'
  | 'divider'
  | 'callout'
  | 'quote';

interface RichTextObject {
  type: 'text' | 'date',
  text: {
    content: string,
    link: string | null,
  },
  plain_text: string,
}

interface NotionBlockDataWithChildren {
  children?: NotionBlock[],
}

interface NotionTextData extends NotionBlockDataWithChildren {
  rich_text: RichTextObject[],
  color: string,
}

interface NotionBulletedData extends NotionTextData {}

interface NotionCalloutData extends NotionTextData {
  icon: {
    emoji: string,
  },
}

interface NotionFileData extends NotionBlockDataWithChildren {
  type: 'file' | 'external',
  file?: {
    url: string,
    expiry_date: number,
  },
  external?: {
    url: string,
  },
  caption?: RichTextObject[],
}

type NotionBlockData = NotionBlockDataWithChildren | NotionTextData | NotionBulletedData | NotionCalloutData | NotionFileData;

/**
 * Block object compatible with Notion's API and the `NotionRenderer`.
 */
interface NotionBlock {
  type: SupportedBlockType;
  paragraph?: NotionTextData
  heading_1?: NotionTextData,
  heading_2?: NotionTextData,
  heading_3?: NotionTextData,
  bulleted_list_item?: NotionBulletedData,
  numbered_list_item?: NotionBulletedData,
  toggle?: NotionBulletedData,
  image?: NotionFileData,
  divider?: NotionBlockDataWithChildren,
  callout?: NotionCalloutData,
  quote?: NotionCalloutData,
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
  NotionBlock,
  NotionBlockData,
  NotionTextData,
  SupportedBlockType,
};
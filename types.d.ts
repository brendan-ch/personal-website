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
  | 'quote'
  | 'code'
  | 'table_of_contents';
  // | 'column_list'
  // | 'column';

interface RichTextObject {
  type: 'text' | 'date',
  text: {
    content: string,
    link?: string,
  },
  plain_text?: string,
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

interface NotionCodeData extends NotionTextData {
  language: string,
}

type NotionBlockData = NotionBlockDataWithChildren | NotionTextData | NotionBulletedData | NotionCalloutData | NotionFileData;

/**
 * Block object compatible with Notion's API and the `NotionRenderer`.
 */
interface NotionBlock {
  type: SupportedBlockType;
  id: string,
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
  quote?: NotionTextData,
  code?: NotionCodeData,
  table_of_contents?: NotionBlockDataWithChildren,
  // column_list?: NotionBlockDataWithChildren,
  // column?: NotionBlockDataWithChildren,
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
 * Frontmatter properties that can be sorted.
 */
type SortProperty = 'title' | 'description' | 'previewImage' | 'coverImage';

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

interface PageData {
  /**
   * Contents of the markdown file.
   */
  content: string | null,
  /**
   * Title of the page, as provided by the "Title" field.
   */
  /**
   * ID (file name) of the page. Also serves as the pretty link.
   */
  id: string,
  title: string | null,
  description: string | null,
  previewImage: string | null,
  coverImage: string | null,
  tags: string[] | null,
  prefix: string,
}

interface PageQuery {
  /**
   * Prefix (folder name) of the page.
   */
  prefix?: string,
  /**
   * The file name of the page.
   */
  id: string,
  /**
   * Indicate whether to return the contents of the page
   */
  withContent?: boolean,
}

interface PageListQuery {
  /**
   * Prefix (folder name) of the page.
   * If not provided, searches all folders.
   */
  prefix?: string,
  /**
   * Array of sort objects.
   */
  sort?: PageListSort[],
  /**
   * Filter object(s). If multiple provided, objects returned only need to
   * meet one of the specified objects.
   */
  filter?: PageListFilter[],
}

enum SortOrder {
  ASC,
  DESC,
}

interface PageListSort {
  property: string,
  order: SortOrder,
}

interface PageListFilterString {
  contains?: string,
}

interface PageListFilterTags {
  contains?: string[],
}

interface PageListFilter {
  title?: PageListFilterString,
  description?: PageListFilterString,
  tags?: PageListFilterTags,
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
  RichTextObject,
  SupportedBlockType,
  PageQuery,
  PageListQuery,
  PageListSort,
  PageListFilter,
  PageData,
};
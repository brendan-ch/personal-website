/**
 * Frontmatter properties that can be sorted.
 */
type SortProperty = 'title' | 'description' | 'previewImage' | 'coverImage';

interface PageExternalLink {
  name: string,
  url: string,
}

interface ImageSize {
  width: number,
  height: number,
  imagePath: string,
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
  
  tags: string[] | null,
  prefix: string,
  links: PageExternalLink[] | null,
  date: string | null,

  allImages: ImageSize[],

  order?: number,
  wideImages: boolean,
}

interface PageQuery {
  /**
   * Prefix (folder name) of the page.
   */
  prefix?: 'blog' | 'work' | 'doc',
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
  prefix: string,
  /**
   * Array of sort objects.
   */
  sort?: PageListSort[],
  /**
   * Filter object(s). If multiple provided, objects returned only need to
   * meet one of the specified objects.
   */
  filter?: PageListFilter[],
  /**
   * Index returned from a previous response, used to request the next set of results.
   */
  startIndex?: number,
  /**
   * The desired number of items to return. If not passed, will return all items.
   */
  pageSize?: number,
}

interface PageListSort {
  property: 'order',
  order: 'asc' | 'desc',
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

interface PageListResponse {
  pageData: PageData[],
  nextIndex: number | null,
  totalCount: number,
}

interface Response {
  successful: boolean,
  error?: string,
  data?: any,
}

interface ContactFormBody {
  /**
   * The sender's name in the email.
   */
  name: string,
  /**
   * Email address to reply to.
   */
  email: string,
  /**
   * Subject line of the email.
   */
  subject?: string,
  /**
   * Plaintext message inside the email.
   */
  message: string,
}

interface TagObject {
  /**
   * The name of the tag.
   */
  name: string,
  /**
   * In an array of tags, these are the indices that the tag is related to.
   */
  relatedTo: number[],
}

interface FormInputItem {
  name: string,
  label: string,
  pattern?: RegExp,
  required?: boolean,
  placeholder: string,
  noMatchError?: string,
  multiline?: boolean,
}

export {
  PageQuery,
  ContactFormBody,
  PageListQuery,
  PageListSort,
  PageListFilter,
  PageListResponse,
  PageData,
  PageExternalLink,
  Response,
  TagObject,
  ImageSize,
  FormInputItem,
};
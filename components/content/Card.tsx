import { PageExternalLink } from "../../types";

interface CardProps {
  /**
   * Title of the card.
   */
  title: string,

  /**
   * Description content of the card.
   */
  description: string,

  /**
   * Path to an image to display in the card.
   * This can be a local path within the `public` folder,
   * or it can be a remote URL.
   */
  imagePath: string,

  /**
   * External links to display within the card.
   */
  externalLinks: PageExternalLink[]
}

/**
 * Component which displays a single 
 * @param param0 
 */
export default function Card({
  title,
  description,
  imagePath,
}: CardProps) {
  return <></>
}
import styles from './Hero.module.css';

interface Props extends React.PropsWithChildren {
  /**
   * Path to an image to display.
   * This can be a local path within the `public` folder,
   * or it can be a remote URL.
   * 
   * Domains of remote URLs must be configured in next.config.js.
   * See https://nextjs.org/docs/pages/building-your-application/optimizing/images#domains for more info.
   */
  imagePath: string,

  /**
   * Alt text for the hero image.
   */
  alt: string,
}

export default function Hero({ imagePath, alt, children }: Props) {
  return <></>
}
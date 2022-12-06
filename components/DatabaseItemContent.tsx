import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import { PageData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import React, { useCallback, useState } from 'react';
import Lightbox from './Lightbox';
import ExternalLink from './ExternalLink';
import styles from '../styles/DatabaseItemContent.module.css';

interface CalloutInformationProps {
  title: string,
  description: string,
  className?: string,
}

export function CalloutInformation(props: CalloutInformationProps) {
  return (
    <div className={`${styles.calloutInformationWrapper} ${props.className ? props.className : ''}`}>
      <p>
        <b>
          {props.title}
        </b>
      </p>
      <p>
        {props.description}
      </p>
    </div>
  );
}

interface Props extends PageData {
  backButtonText?: string,
  backButtonHref?: string,
}

export default function DatabaseItemContent({
  title,
  content,
  coverImage,
  backButtonText,
  backButtonHref,
  links,
  tags,
  date,
  allImages,
  wideImages,
}: Props) {
  const [lightboxImageLink, setLightboxImageLink] = useState<string>();
  const [lightboxCaption, setLightboxCaption] = useState<string>();

  const handleImageClick = useCallback(function handleImageClick(link: string, caption: string) {
    setLightboxImageLink(link);
    setLightboxCaption(caption);
  }, []);

  const handleImageClose = useCallback(function handleImageClose() {
    setLightboxImageLink(undefined);
    setLightboxCaption(undefined);
  }, []);

  const pageHeader: JSX.Element = (
    <div className={`${utils.itemWrapper} ${utils.headerContainer}`}>
      <PageHeader
        belowText={title || ''}
        breadcrumb={backButtonText && backButtonHref ? [
          {
            name: 'Home',
            href: '/',
          },
          {
            name: backButtonText,
            href: backButtonHref,
          },
        ] : undefined}
      />
      <div className={styles.miniInfo}>
        {tags || date ? (
          <>
            <div className={styles.miniInfoWrapperDesktop}>
              <p>
                {tags?.filter((tag) => tag !== 'Featured').join(', ')}
                {date ? ` / ${date}` : undefined}
              </p>
            </div>
            <div className={styles.miniInfoWrapperMobile}>
              <p>
                {tags?.filter((tag) => tag !== 'Featured').join(', ')}
              </p>
              <p>
                {date}
              </p>
            </div>
          </>
        ) : undefined}

        {links ? (
          <div className={styles.miniLinksWrapper}>
            {links.map((link, index) => (
              <ExternalLink {...link} key={index} />
            ))}
          </div>
        ) : undefined}
      </div>
    </div>
  );

  return (
    <>
      <Lightbox
        imageLink={lightboxImageLink}
        visible={lightboxImageLink !== undefined}
        caption={lightboxCaption}
        onClose={handleImageClose}
      />
      <main>
        {pageHeader}
        {coverImage ? (
          <div className={utils.itemWrapper}>
            <div
              className={`${styles.slimImageContainer}`}
              style={{
                aspectRatio: `${coverImage.width} / ${coverImage.height}`,
              }}
            >
              <ImageWithFadeIn
                alt={`${title} preview image`}
                src={coverImage.imagePath}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ) : undefined}
        {content ? (
          <div className={wideImages ? utils.itemWrapper : utils.innerItemWrapper}>
            <MarkdownRenderer
              content={content}
              onImageClick={handleImageClick}
              allImages={allImages}
            />
          </div>
        ) : undefined}
      </main>
    </>
  );
}
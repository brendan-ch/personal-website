import PageHeader from '../PageHeader';
import utils from '../../styles/utils.module.css';
import { PageData, PageExternalLink } from '../../types';
import MarkdownRenderer from '../MarkdownRenderer';
import React, { useCallback, useState } from 'react';
import Lightbox from '../Lightbox';
import ExternalLink from '../ExternalLink';
import styles from '../../styles/DatabaseItemContent.module.css';
import ShareCTA from '../ShareCTA';

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
  shareCTA?: boolean,
}

export default function DatabaseItemContent({
  title,
  content,
  backButtonText,
  backButtonHref,
  links,
  tags,
  date,
  allImages,
  wideImages,
  shareCTA,
  prefix,
  id,
}: Props) {
  const [lightboxImageLink, setLightboxImageLink] = useState<string>();
  const [lightboxCaption, setLightboxCaption] = useState<string>();

  // Store CTA links here
  // Get current page URL
  const currentPath = ['https://bchen.dev', prefix, id].join('/');
  const sharingLinks: PageExternalLink[] = [
    {
      name: 'LinkedIn',
      url: `https://linkedin.com/share/share-offsite?url=${encodeURIComponent(currentPath)}&title=${encodeURIComponent(title || '')}`
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPath)}`
    },
  ];

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
        {content ? (
          <div className={wideImages ? utils.itemWrapper : utils.innerItemWrapper}>
            <MarkdownRenderer
              content={content}
              onImageClick={handleImageClick}
              allImages={allImages}
            />
          </div>
        ) : undefined}
        {shareCTA ? (
          <div className={wideImages ? utils.itemWrapper : utils.innerItemWrapper}>
            <ShareCTA
              links={sharingLinks}
              copyLink={currentPath}
            />
          </div>
        ) : undefined}
      </main>
    </>
  );
}
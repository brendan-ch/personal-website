import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import { PageData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import React, { useState } from 'react';
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
  prefix,
  coverImage,
  imageAspectRatio,
  backButtonText,
  backButtonHref,
  type,
  links,
  tags,
  date,
}: Props) {
  const [lightboxImageLink, setLightboxImageLink] = useState<string>();
  const [lightboxCaption, setLightboxCaption] = useState<string>();

  function handleImageClick(link: string, caption: string) {
    setLightboxImageLink(link);
    setLightboxCaption(caption);
  }

  function handleImageClose() {
    setLightboxImageLink(undefined);
    setLightboxCaption(undefined);
  }

  const verticalPageInfo = (
    <>
      <div className={utils.itemWrapper}>
        <PageHeader
          aboveText={backButtonText || 'Back'}
          belowText={title || ''}
          includeBackButton
          backButtonHref={backButtonHref || `/${prefix}`}
        />
        {/* Callout */}
        {tags || date || links ? (
          <div className={styles.callout}>
            {/* Text information wrapper */}
            <div className={styles.tagsDateWrapper}>
              {/* Tags */}
              {tags ? (
                <CalloutInformation title="Tags" description={tags.filter((tag) => tag !== 'Featured').join(', ')} className={styles.fillSpace} />
              ) : undefined}
              {/* Date */}
              {date ? (
                <CalloutInformation title="Date" description={date} className={styles.fillSpace} />
              ) : undefined}
            </div>
            {/* Links */}
            {links ? (
              <div className={styles.linksWrapper}>
                {links.map((link, index) => (
                  <ExternalLink {...link} key={index} />
                ))}
              </div>
            ) : undefined}
          </div>
        ) : undefined}
      </div>
    </>
  );

  let pageInfo: JSX.Element;
  switch (type) {
    default: // default is vertical
      pageInfo = verticalPageInfo;
  }

  return (
    <main>
      <div className={utils.spacer} />
      {pageInfo}
      {coverImage ? (
        <div className={utils.itemWrapper}>
          <ImageWithFadeIn
            alt={`${title} preview image`}
            src={coverImage}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : undefined}
      {content ? (
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <MarkdownRenderer
            content={content}
            onImageClick={handleImageClick}
            imageAspectRatio={imageAspectRatio || undefined}
          />
        </div>
      ) : undefined}
      <div className={utils.footerWrapper}>
        <Footer />
      </div>
      <Lightbox
        imageLink={lightboxImageLink}
        visible={lightboxImageLink !== undefined}
        caption={lightboxCaption}
        onClose={handleImageClose}
      />
    </main>
  );
}
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
  description,
  content,
  prefix,
  coverImage,
  backButtonText,
  backButtonHref,
  type,
  links,
  tags,
  date,
  allImages,
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

  let pageHeader: JSX.Element;
  let pageCallout: JSX.Element;
  switch (type) {
    case 'wide':
      pageCallout = tags || date || links ? (
        <div className={`${styles.callout} ${styles.wideCallout}`}>
          {/* Text information wrapper */}
          <div className={styles.tagsDateWrapper} style={{
            flexDirection: 'column',
          }}>
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
      ) : <></>;
    
      pageHeader = (
        <div className={`${utils.itemWrapper} ${styles.wideHeader}`}>
          <PageHeader
            aboveText={backButtonText || 'Back'}
            belowText={title || ''}
            includeBackButton
            backButtonHref={backButtonHref || `/${prefix}`}
          />
        </div>
      );

      break;
    case 'horizontal':
      pageCallout = tags || date || links ? (
        <div className={`${styles.callout}`}>
          {/* Text information wrapper */}
          <div className={styles.tagsDateWrapper} style={{
            flexDirection: 'column',
          }}>
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
      ) : <></>;

      pageHeader = (
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText={backButtonText || 'Back'}
            belowText={title || ''}
            includeBackButton
            backButtonHref={backButtonHref || `/${prefix}`}
          />
        </div>
      );
      break;
    case 'vertical':
    default: // default is vertical
      pageCallout = tags || date || links ? (
        <div className={utils.itemWrapper}>
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
        </div>
      ) : <></>;

      pageHeader = (
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText={backButtonText || 'Back'}
            belowText={title || ''}
            includeBackButton
            backButtonHref={backButtonHref || `/${prefix}`}
          />
        </div>
      );
  }

  return (
    <>
      <main className={styles.container}>
        {type === 'wide' ? (
          <>
            <div className={styles.wideContainer}>
              <div className={styles.wideTextContainer}>
                {pageHeader}
                {pageCallout}
              </div>
              {coverImage ? (
                <div
                  className={`${styles.wideImageContainer}`}
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
              ) : undefined}
            </div>
            <div className={styles.wideDescriptionContainer}>
              <h3>{description}</h3>
            </div>
            {content ? (
              <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
                <MarkdownRenderer
                  content={content}
                  onImageClick={handleImageClick}
                  allImages={allImages}
                />
              </div>
            ) : undefined}
          </>
        ) : undefined}
        {type === 'horizontal' ? (
          <>
            <div className={utils.spacer} />
            {pageHeader}
            <div className={styles.verticalCalloutWrapper}>
              <div className={utils.itemWrapper}>
                {pageCallout}
              </div>
            </div>
            <div className={`${styles.horizontalWrapper} ${utils.itemWrapper}`}>
              {coverImage ? (
                <div
                  className={styles.slimImageContainer}
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
              ) : undefined}
              {content ? (
                <div className={styles.horizontalContentWrapper}>
                  <div className={styles.horizontalCalloutWrapper}>
                    {pageCallout}
                  </div>
                  <MarkdownRenderer
                    content={content}
                    onImageClick={handleImageClick}
                    allImages={allImages}
                  />
                </div>
              ) : undefined}
            </div>
          </>
        ) : undefined}
        {type !== 'horizontal' && type !== 'wide' ? (
          <>
            <div className={utils.spacer} />
            {pageHeader}
            {pageCallout}
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
              <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
                <MarkdownRenderer
                  content={content}
                  onImageClick={handleImageClick}
                  allImages={allImages}
                />
              </div>
            ) : undefined}
          </>
        ) : undefined}
        <Lightbox
          imageLink={lightboxImageLink}
          visible={lightboxImageLink !== undefined}
          caption={lightboxCaption}
          onClose={handleImageClose}
        />
      </main>
      <div className={utils.spacer} />
      <div className={utils.footerWrapper}>
        <Footer />
      </div>
    </>
  );
}
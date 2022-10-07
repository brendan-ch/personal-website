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
  logo,
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

  let pageHeader: JSX.Element = <></>;
  let pageCallout: JSX.Element = <></>;
  switch (type) {
    case 'wide':
      pageCallout = tags || date || links ? (
        <div className={`${styles.callout} ${styles.wideCallout}`}>
          {/* Text information wrapper */}
          <div className={styles.tagsDateWrapper} style={{
            flexDirection: 'column',
            marginBottom: 24,
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
            belowText={''}
            breadcrumb={[
              {
                name: 'Home',
                href: '/',
              },
              {
                name: backButtonText || '',
                href: backButtonHref || '',
              },
            ]}
          />
          {logo ? (
            <div style={{
              width: 96,
              height: 96,
              position: 'relative',
            }}>
              <ImageWithFadeIn
                alt={`${title} logo`}
                src={logo}
  
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : undefined}

          <h1>{title}</h1>
        </div>
      );

      break;
    case 'horizontal':
    case 'vertical':
    default:
      pageHeader = (
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
                    sizes="(max-width: 720px) 200vw, 100vw"
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
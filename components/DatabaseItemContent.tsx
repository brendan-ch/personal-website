import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import { PageData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { useState } from 'react';
import Lightbox from './Lightbox';
import ExternalLink from './ExternalLink';
import styles from '../styles/DatabaseItemContent.module.css';

interface CalloutInformationProps {
  title: string,
  description: string,
}

export function CalloutInformation(props: CalloutInformationProps) {
  return (
    <div className={styles.calloutInformationWrapper}>
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
        <div>
          {/* Text information wrapper */}
          <div>
            {/* Tags */}
            {tags ? (
              <CalloutInformation title="Tags" description={tags.join(', ')} />
            ) : undefined}
            {/* Date */}
            {date ? (
              <CalloutInformation title="Date" description={date} />
            ) : undefined}
          </div>
          {/* Links */}
          <div>
            {links?.map((link, index) => (
              <ExternalLink {...link} key={index} />
            ))}
          </div>
        </div>
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
import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import { PageData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { useState } from 'react';
import Lightbox from './Lightbox';

export default function DatabaseItemContent({
  title,
  content,
  prefix,
  coverImage,
}: PageData) {
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

  return (
    <main>
      <div className={utils.spacer} />
      <div className={utils.itemWrapper}>
        {title ? (
          <PageHeader
            aboveText="Back"
            belowText={title}
            includeBackButton
            backButtonHref={`/${prefix}`}
          />
        ) : undefined}
      </div>
      {coverImage ? (
        <div className={utils.fullWidthImageWrapper}>
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
          />
        </div>
      ) : undefined}
      <div className={utils.spacer} />
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
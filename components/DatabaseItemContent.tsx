import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import { PageData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { useState } from 'react';
import Lightbox from './Lightbox';

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

  return (
    <main>
      <div className={utils.spacer} />
      <div className={utils.itemWrapper}>
        {title ? (
          <PageHeader
            aboveText={backButtonText || 'Back'}
            belowText={title}
            includeBackButton
            backButtonHref={backButtonHref || `/${prefix}`}
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
            imageAspectRatio={imageAspectRatio || undefined}
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
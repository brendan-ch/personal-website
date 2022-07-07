import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import NotionRenderer from './NotionRenderer';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';

interface Props {
  title?: string,
  blocks?: any[],
  coverImageLink?: string,
  error?: string,
}

export default function DatabaseItemContent({ title, blocks, coverImageLink, error }: Props) {
  return error ? (
    <main>
      <div className={utils.spacer} />
      <div className={utils.itemWrapper}>
        <PageHeader
          aboveText="Home"
          belowText={title || ''}
          includeBackButton
          backButtonHref="/"
        />
      </div>
      <div className={utils.itemWrapper}>
        <p>
          {error}
        </p>
      </div>
    </main>
  ) : (
    <main>
      <div className={utils.spacer} />
      <div className={utils.itemWrapper}>
        <PageHeader
          aboveText="Home"
          belowText={title || ''}
          includeBackButton
          backButtonHref="/"
        />
      </div>
      {coverImageLink ? (
        <div className={utils.fullWidthImageWrapper}>
          <ImageWithFadeIn
            alt={`${title} preview image`}
            src={coverImageLink}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : undefined}
      <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
        <NotionRenderer
          blocks={blocks || []}
        />
      </div>
      <div className={utils.spacer} />
      <div className={utils.footerWrapper}>
        <Footer />
      </div>
    </main>
  );
}
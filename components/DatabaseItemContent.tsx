import PageHeader from './PageHeader';
import utils from '../styles/utils.module.css';
import NotionRenderer from './NotionRenderer';
import Footer from './Footer';
import ImageWithFadeIn from './ImageWithFadeIn';
import { PageData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

// interface Props {
//   title?: string,
//   blocks?: any[],
//   coverImageLink?: string,
//   error?: string,
//   header?: {
//     aboveText: string,
//     belowText: string,
//     backButtonHref: string,
//   }
// }

export default function DatabaseItemContent({
  title,
  content,
  prefix,
  coverImage,
}: PageData) {
  // return error ? (
  //   <main>
  //     <div className={utils.spacer} />
  //     <div className={utils.itemWrapper}>
  //       {header ? (
  //         <PageHeader
  //           aboveText={header.aboveText}
  //           belowText={header.belowText}
  //           includeBackButton
  //           backButtonHref={header.backButtonHref}
  //         />
  //       ) : undefined}
  //     </div>
  //     <div className={utils.itemWrapper}>
  //       <p>
  //         {error}
  //       </p>
  //     </div>
  //   </main>
  // ) : (
  //   <main>
  //     <div className={utils.spacer} />
  //     <div className={utils.itemWrapper}>
  //       {header ? (
  //         <PageHeader
  //           aboveText={header.aboveText}
  //           belowText={header.belowText}
  //           includeBackButton
  //           backButtonHref={header.backButtonHref}
  //         />
  //       ) : undefined}
  //     </div>
  //     {coverImageLink ? (
  //       <div className={utils.fullWidthImageWrapper}>
  //         <ImageWithFadeIn
  //           alt={`${title} preview image`}
  //           src={coverImageLink}
  //           layout="fill"
  //           objectFit="cover"
  //         />
  //       </div>
  //     ) : undefined}
  //     <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
  //       <NotionRenderer
  //         blocks={blocks || []}
  //       />
  //     </div>
  //     <div className={utils.spacer} />
  //     <div className={utils.footerWrapper}>
  //       <Footer />
  //     </div>
  //   </main>
  // );
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
          {/* <NotionRenderer
            blocks={blocks || []}
          /> */}
          <MarkdownRenderer
            content={content}
          />
        </div>
      ) : undefined}
      <div className={utils.spacer} />
      <div className={utils.footerWrapper}>
        <Footer />
      </div>
    </main>
  );
}
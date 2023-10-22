import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function Figma(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_649_7324)" fill={EMPHASIS}>
        <path d="M21.25 11a5.386 5.386 0 003.712-1.464A4.882 4.882 0 0026.5 6a4.882 4.882 0 00-1.538-3.536A5.386 5.386 0 0021.25 1h-10.5a5.386 5.386 0 00-3.712 1.464A4.882 4.882 0 005.5 6c0 1.326.553 2.598 1.538 3.536A5.386 5.386 0 0010.75 11a5.386 5.386 0 00-3.712 1.464A4.882 4.882 0 005.5 16c0 1.326.553 2.598 1.538 3.535A5.386 5.386 0 0010.75 21a5.439 5.439 0 00-2.917.843A5.061 5.061 0 005.9 24.087a4.78 4.78 0 00-.3 2.889 4.93 4.93 0 001.438 2.56c.734.699 1.67 1.175 2.688 1.368a5.494 5.494 0 003.033-.285 5.203 5.203 0 002.356-1.841A4.832 4.832 0 0016 26V11h5.25z" />
        <path d="M21.25 21c2.9 0 5.25-2.239 5.25-5s-2.35-5-5.25-5S16 13.239 16 16s2.35 5 5.25 5z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_649_7324">
          <path fill="#fff" transform="translate(1 1)" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Figma;
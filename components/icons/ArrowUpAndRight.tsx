import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function ArrowUpAndRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Arrow up and right</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M9 1H31V23H29V4.41421L2.70711 30.7071L1.29289 29.2929L27.5858 3H9V1Z" fill={EMPHASIS}/>
    </svg>
  );
}

export default ArrowUpAndRight;
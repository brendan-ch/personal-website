import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Chevron down</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M31.2 9.10355L29.7858 7.68934L15.9929 21.4822L2.2 7.68934L0.785782 9.10355L15.9929 24.3107L31.2 9.10355Z" fill={EMPHASIS}/>
    </svg>
  );
}

export default ChevronDown;
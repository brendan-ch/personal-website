import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Chevron right</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M9 0.792892L7.58579 2.20711L21.3787 16L7.58579 29.7929L9 31.2071L24.2071 16L9 0.792892Z" fill={EMPHASIS}/>
    </svg>
  );
}

export default ChevronRight;
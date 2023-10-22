import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function ArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Arrow up</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.29291 15.2929L16 0.585788L30.7071 15.2929L29.2929 16.7071L17 4.41422L17 30L15 30L15 4.41421L2.70712 16.7071L1.29291 15.2929Z" fill={EMPHASIS}/>
    </svg>
  );
}

export default ArrowUp;
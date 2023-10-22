import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Arrow down</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.29289 16.7071L16 31.4142L30.7071 16.7071L29.2929 15.2929L17 27.5858L17 2L15 2L15 27.5858L2.70711 15.2929L1.29289 16.7071Z" fill={EMPHASIS} />
    </svg>
  );
}

export default ArrowDown;
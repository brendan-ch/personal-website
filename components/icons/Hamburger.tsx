import * as React from 'react';
import { EMPHASIS } from '../../helpers/Constants';

function Hamburger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Hamburger</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M31 4H1V2H31V4Z" fill={EMPHASIS}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M31 17.5H1V15.5H31V17.5Z" fill={EMPHASIS}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M31 30H1V28H31V30Z" fill={EMPHASIS}/>
    </svg>
  );
}

export default Hamburger;
import * as React from 'react';

function ChevronUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Chevron up</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M31.2 22.8964L29.7858 24.3107L15.9929 10.5178L2.2 24.3107L0.785782 22.8964L15.9929 7.68934L31.2 22.8964Z" fill="#121212"/>
    </svg>
  );
}

export default ChevronUp;
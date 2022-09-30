import * as React from 'react';

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Chevron left</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M22.7929 0.792892L24.2071 2.20711L10.4142 16L24.2071 29.7929L22.7929 31.2071L7.58579 16L22.7929 0.792892Z" fill="#121212"/>
    </svg>
  );
}

export default ChevronLeft;
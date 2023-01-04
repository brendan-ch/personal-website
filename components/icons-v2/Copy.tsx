import React from 'react';

function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1 7H8V9H3V29H20V27H22V31H1V7Z" fill="#121212"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1H31V25H10V1ZM12 3V23H29V3H12Z" fill="#121212"/>
    </svg>
  );
}

export default Copy;
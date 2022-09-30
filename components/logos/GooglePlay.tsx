import * as React from 'react';

function GooglePlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 2.841v26.317a.29.29 0 00.494.205L16.196 16 2.494 2.635A.29.29 0 002 2.841zm19.942 7.668L4.76 1.043l-.01-.006c-.296-.16-.578.24-.335.473l13.468 12.878 4.059-3.879zM4.416 30.49c-.244.233.038.634.335.473l.01-.006 17.18-9.466-4.058-3.88L4.416 30.49zm24.462-16.164l-4.798-2.643L19.569 16l4.51 4.314 4.799-2.64c1.305-.721 1.305-2.627 0-3.348z"
        fill="#121212"
      />
    </svg>
  );
}

export default GooglePlay;
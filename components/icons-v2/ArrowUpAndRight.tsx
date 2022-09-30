import * as React from 'react';

function ArrowUpAndRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_635_6551)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 1h22v22h-2V4.414L2.707 30.707l-1.414-1.414L27.586 3H9V1z"
          fill="#121212"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_635_6551">
          <path fill="#fff" transform="translate(1 1)" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ArrowUpAndRight;
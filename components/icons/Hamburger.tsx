import { IconProps } from './icon-types';

export default function Hamburger({ width, height }: IconProps) {
  return (
    <svg width={`${width}`} height={`${height}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M32 10.5H8V9.5H32V10.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M32 20.5H8V19.5H32V20.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M32 30.5H8V29.5H32V30.5Z" />
    </svg>
  );
}
import { IconProps } from '../icons/icon-types';
import { RED } from '../../helpers/Constants';

export default function LogoStandalone({ width, height }: IconProps) {
  return (
    <svg width={`${width}`} height={`${height}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10V0H60V10H50Z" fill={RED}/>
      <path d="M60 10V0H70V10H60Z" fill={RED}/>
      <path d="M70 10V0H80V10H70Z" fill={RED}/>
      <path d="M80 10V0H90V10H80Z" fill={RED}/>
      <path d="M80 20V10H90V20H80Z" fill={RED}/>
      <path d="M80 30V20H90V30H80Z" fill={RED}/>
      <path d="M80 40V30H90V40H80Z" fill={RED}/>
      <path d="M80 50V40H90V50H80Z" fill={RED}/>
      <path d="M80 60V50H90V60H80Z" fill={RED}/>
      <path d="M80 70V60H90V70H80Z" fill={RED}/>
      <path d="M70 70V60H80V70H70Z" fill={RED}/>
      <path d="M60 70V60H70V70H60Z" fill={RED}/>
      <path d="M50 70V60H60V70H50Z" fill={RED}/>
      <path d="M40 40V30H50V40H40Z" fill={RED}/>
      <path d="M30 40V30H40V40H30Z" fill={RED}/>
      <path d="M20 40V30H30V40H20Z" fill={RED}/>
      <path d="M10 40V30H20V40H10Z" fill={RED}/>
      <path d="M10 50V40H20V50H10Z" fill={RED}/>
      <path d="M10 60V50H20V60H10Z" fill={RED}/>
      <path d="M10 70V60H20V70H10Z" fill={RED}/>
      <path d="M10 80V70H20V80H10Z" fill={RED}/>
      <path d="M10 90V80H20V90H10Z" fill={RED}/>
      <path d="M10 100V90H20V100H10Z" fill={RED}/>
      <path d="M20 100V90H30V100H20Z" fill={RED}/>
      <path d="M30 100V90H40V100H30Z" fill={RED}/>
      <path d="M40 100V90H50V100H40Z" fill={RED}/>
    </svg>
  );
}
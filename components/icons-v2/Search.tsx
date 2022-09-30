import * as React from 'react';

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Search</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19ZM11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" fill="#121212"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.7071 17.2929L30.7071 29.2929L29.2929 30.7071L17.2929 18.7071L18.7071 17.2929Z" fill="#121212"/>
    </svg>
  );
}

export default Search;
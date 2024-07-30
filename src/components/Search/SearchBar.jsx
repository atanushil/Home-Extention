import React, { useEffect } from 'react';
import config from '../../config';
export default function SearchBar() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = `https://cse.google.com/cse.js?cx=${config.PROGRAMMABLE_SEARCH_ENGINE_ID}`;
    script.async = true;

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className='w-full rounded-full'>
    <div className="gcse-search" id=''></div>
    </div>
  );
}

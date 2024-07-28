import React from 'react';
import Google from '../../Media/google.png';
import Calender from '../../Media/calender.png';
import Collection from '../../Media/collections.png';
import Contacts from '../../Media/contacts.png';
import Docs from '../../Media/docs.png';
import Drive from '../../Media/drive.png';
import Earth from '../../Media/earth.png';
import Duo from '../../Media/duo.png';
import Gmail from '../../Media/gmail.png';
import Hangouts from '../../Media/hangouts.png';
import Jamboard from '../../Media/jamboard.png';
import Keeps from '../../Media/keeps.png';
import Map from '../../Media/map.png';
import News from '../../Media/news.png';
import Search from '../../Media/search.png';
import Translate from '../../Media/translate.png';
import Photos from '../../Media/photos.png';
import Youtube from '../../Media/youtube.png';

const imageLinks = [
  { src: Google, alt: 'Google Logo', href: 'https://www.google.com' },
  { src: Calender, alt: 'Calendar', href: 'https://calendar.google.com' },
  { src: Collection, alt: 'Collection', href: 'https://collections.google.com' },
  { src: Contacts, alt: 'Contacts', href: 'https://contacts.google.com' },
  { src: Docs, alt: 'Docs', href: 'https://docs.google.com' },
  { src: Drive, alt: 'Drive', href: 'https://drive.google.com' },
  { src: Earth, alt: 'Earth', href: 'https://earth.google.com' },
  { src: Duo, alt: 'Duo', href: 'https://duo.google.com' },
  { src: Gmail, alt: 'Gmail', href: 'https://mail.google.com' },
  { src: Hangouts, alt: 'Hangouts', href: 'https://hangouts.google.com' },
  { src: Jamboard, alt: 'Jamboard', href: 'https://jamboard.google.com' },
  { src: Keeps, alt: 'Keeps', href: 'https://keep.google.com' },
  { src: Map, alt: 'Map', href: 'https://maps.google.com' },
  { src: News, alt: 'News', href: 'https://news.google.com' },
  { src: Search, alt: 'Search', href: 'https://www.google.com/search' },
  { src: Translate, alt: 'Translate', href: 'https://translate.google.com' },
  { src: Photos, alt: 'Photos', href: 'https://photos.google.com' },
  { src: Youtube, alt: 'YouTube', href: 'https://www.youtube.com' },
];

export default function MyComponent() {
  return (
    <div className="flex  overflow-auto sm:w-full md:w-full lg:w-fit xl:w-fit 2xl:w-fit
      gap-2 px-2 py-4 backdrop-blur-sm
      sm:flex-row md:flex-row lg:flex-col xl:flex-col 2xl:flex-col
      sm:fixed md:fixed lg:relative xl:relative 2xl:relative
      sm:bottom-0 sm:left-0 md:bottom-0 md:left-0">
      {imageLinks.map(({ src, alt, href }, index) => (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer" className='p-1'>
          <img src={src} alt={alt} className="w-[32px] h-8 object-cover" />
        </a>
      ))}
    </div>
  );
}

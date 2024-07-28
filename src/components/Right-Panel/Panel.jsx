import Google from "../../Media/google.png";
import Calender from "../../Media/calender.png";
// import Collection from '../../Media/collections.png';
import Contacts from "../../Media/contacts.png";
import Docs from "../../Media/docs.png";
import Drive from "../../Media/drive.png";
import Earth from "../../Media/earth.png";
import Duo from "../../Media/duo.png";
import Gmail from "../../Media/gmail.png";
import Hangouts from "../../Media/hangouts.png";
import Jamboard from "../../Media/jamboard.png";
import Keeps from "../../Media/keeps.png";
import Map from "../../Media/map.png";
import News from "../../Media/news.png";
import Translate from "../../Media/translate.png";
import Photos from "../../Media/photos.png";
import Youtube from "../../Media/youtube.png";
import { IoMdSettings } from "react-icons/io";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

const imageLinks = [
  { src: Google, alt: "Google Logo", href: "https://myaccount.google.com/" },
  { src: Calender, alt: "Calendar", href: "https://calendar.google.com" },
  { src: Contacts, alt: "Contacts", href: "https://contacts.google.com" },
  { src: Docs, alt: "Docs", href: "https://docs.google.com" },
  { src: Drive, alt: "Drive", href: "https://drive.google.com" },
  { src: Earth, alt: "Earth", href: "https://earth.google.com" },
  { src: Duo, alt: "Duo", href: "https://duo.google.com" },
  { src: Gmail, alt: "Gmail", href: "https://mail.google.com" },
  { src: Hangouts, alt: "Hangouts", href: "https://hangouts.google.com" },
  { src: Jamboard, alt: "Jamboard", href: "https://jamboard.google.com" },
  { src: Keeps, alt: "Keeps", href: "https://keep.google.com" },
  { src: Map, alt: "Map", href: "https://maps.google.com" },
  { src: News, alt: "News", href: "https://news.google.com" },
  { src: Translate, alt: "Translate", href: "https://translate.google.com" },
  { src: Photos, alt: "Photos", href: "https://photos.google.com" },
  { src: Youtube, alt: "YouTube", href: "https://www.youtube.com" },
];

export const Panel = () => {
  return (
    <div className="lg:relative xl:relative sm:fixed md:fixed sm:bottom-0 md:bottom-0 lg:bottom-0 sm:left-0 md:left-0 lg:left-0  xl:w-fit 2xl:w-fit lg:w-fit sm:w-full md:w-full h-fit  flex  flex-col  backdrop-blur-lg rounded-md overflow-hidden">
      <div className="flex rounded-md flex-wrap sm:w-full md:w-full lg:w-fit xl:w-fit 2xl:w-fit xl:flex-col sm:flex-row md:flex-row lg:flex-col  2xl:justify-center xl:justify-center lg:justify-center md:justify-between sm:justify-between items-center ">
        {imageLinks.map(({ src, alt, href }, index) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center justify-center hover:backdrop-blur-sm hover:bg-white px-1 py-2"
            key={index}
          >
            <img src={src} alt={alt} width={32} height={32} />
          </a>
        ))}
        <div className="px-1 py-2 flex  items-center justify-center hover:backdrop-blur-sm hover:bg-white">
          <IoExtensionPuzzleSharp onClick={()=>window.open('https://chromewebstore.google.com/')}
            size={32}
          />
          </div>
          <div className="px-1 py-2 flex items-center justify-center hover:backdrop-blur-sm hover:bg-white">
          <IoMdSettings
            size={32}
          />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import FilePicker from "../../Data/FilePicker"; // Import the FilePicker component
import Google from "../../Media/google.png";
import Calender from "../../Media/calender.png";
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

export const Panel = ({ setBackgroundUrl }) => {
  return (
    <div className="fixed shadow-lg bg-white/30 bottom-0 left-0 lg:relative xl:relative 2xl:relative xl:w-fit 2xl:w-fit lg:w-fit sm:w-fit md:w-full h-fit flex flex-col backdrop-blur-lg rounded-md overflow-hidden justify-center items-center">
      <div className="flex rounded-md flex-wrap sm:flex md:flex-row md:flex lg:flex xl:flex 2xl:flex xl:w-fit 2xl:w-fit lg:w-fit sm:w-fit md:w-full h-fit xl:flex-col lg:flex-col 2xl:justify-center lg:justify-center md:justify-center justify-between xl:justify-center items-center">
        {imageLinks.map(({ src, alt, href }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-fit items-center justify-center hover:backdrop-blur-sm hover:bg-white px-2 md:px-2.5 lg:px-1 xl:px-1 2xl:px-1 ${
              index === 0 || index === imageLinks.length - 1
                ? "py-2"
                : "py-1 md:py-2 lg:py-1 xl:py-1 2xl:py-1.2 3xl:py-2"
            }`}
          >
            <img src={src} alt={alt} width={32} height={32} />
          </a>
        ))}
        <div className="">
          <FilePicker setBackgroundUrl={setBackgroundUrl} />
        </div>
      </div>
    </div>
  );
};

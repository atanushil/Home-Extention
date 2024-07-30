import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFigma,
  faSketch,
  faGithub,
  faTwitter,
  faDiscord,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faDev,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";

const LOGOS = [
  { icon: faFigma, link: "https://www.figma.com", color: "#F24E1E", bg: "" },
  { icon: faSketch, link: "https://www.sketch.com", color: "#F7B500", bg: "" },
  { icon: faGithub, link: "https://github.com", color: "#181717", bg: "" },
  { icon: faTwitter, link: "https://twitter.com", color: "#1DA1F2", bg: "" },
  { icon: faDiscord, link: "https://discord.com", color: "#5865F2", bg: "" },
  {
    icon: faInstagram,
    link: "https://www.instagram.com",
    color: "#E4405F",
    bg: "",
  },
  {
    icon: faLinkedin,
    link: "https://www.linkedin.com",
    color: "#0077B5",
    bg: "",
  },
  {
    icon: faStackOverflow,
    link: "https://stackoverflow.com",
    color: "#F48024",
    bg: "",
  },
  { icon: faDev, link: "https://dev.to", color: "#0A0A0A", bg: "" },
  { icon: faCodepen, link: "https://codepen.io", color: "#000000", bg: "" },
];

const InfiniteSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-visible  items-center backdrop-blur-sm shadow-md ">
      <Slider {...settings}>
        {LOGOS.map((logo, index) => (
          <a
            key={index}
            href={logo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center px-2 py-4 hover:bg-slate-400"
          >
            <FontAwesomeIcon
              icon={logo.icon}
              size="2x"
              style={{ color: logo.color, width: "100%" }}
            />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default InfiniteSlider;

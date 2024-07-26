import React from "react";
import Weather from "./components/Weather/Weather";
import TimeDate from "./components/TIme&Date/TimeDate";
import Note from "./components/Note/Note";
import SearchBar from "./components/Search/SearchBar";
import Categories from "./components/Categories/Categories";
import Shortcuts from "./components/Shortcut/Shortcuts";
export default function App() {
  const shortcuts = [
    { name: "Google", link: "https://www.google.com" },
    { name: "Facebook", link: "https://www.facebook.com" },
    { name: "Twitter", link: "https://www.twitter.com" },
    { name: "Brew", link: "https://brew.sh" },
    { name: "Vercel", link: "https://vercel.com/atanushils-projects" },
    { name: "YouTube", link: "https://www.youtube.com/watch?v=2e47bA_Qqyw" },
    { name: "GitHub", link: "https://github.com" },
    { name: "LinkedIn", link: "https://www.linkedin.com" },
    { name: "Stack Overflow", link: "https://stackoverflow.com" },
    { name: "Reddit", link: "https://www.reddit.com" },
    { name: "Amazon", link: "https://www.amazon.com" },
    { name: "Netflix", link: "https://www.netflix.com" },
    { name: "Hacker News", link: "https://news.ycombinator.com" },
    { name: "Medium", link: "https://medium.com" },
    { name: "Dev.to", link: "https://dev.to" },
    { name: "MDN Web Docs", link: "https://developer.mozilla.org" },
    { name: "W3Schools", link: "https://www.w3schools.com" },
    { name: "freeCodeCamp", link: "https://www.freecodecamp.org" },
    { name: "CodePen", link: "https://codepen.io" },
    { name: "CSS-Tricks", link: "https://css-tricks.com" },
    { name: "Smashing Magazine", link: "https://www.smashingmagazine.com" },
    { name: "Coursera", link: "https://www.coursera.org" },
    { name: "Udemy", link: "https://www.udemy.com" },
    { name: "Khan Academy", link: "https://www.khanacademy.org" },
  ];
  const categories = ['sad']
  return (
    <div className="w-full bg-slate-900/30 backdrop-blur-md h-[100vh] flex items-center ">
      <section className="max-w-[20vw] w-4/12 h-fit self-start max-h-fit  mx-8 my-4 flex flex-col gap-3 mt-8">
        <TimeDate />
        <Weather />
        <Note />
      </section>
      <main className="self-start my-8  w-[70vw]   max-h-[80vh]">
        <div>
          <SearchBar />
        </div>
        <div className="my-2 overflow-x-auto flex flex-col gap-2 scrollbar-hidden">
          <Categories categories={categories} />
          <Shortcuts shortcuts={shortcuts} />
        </div>
      </main>
    </div>
  );
}

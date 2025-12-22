"use client";
import { FaHandPointRight } from "react-icons/fa";
import Image from "next/image";

const PageSidebar = () => {
  const tips = [
    "Use a title which includes vehicle's brand, model and year.",
    "Set a competitive daily price based on your vehicle's condition and market rates.",
    "Upload high-quality image as possible.",
    "Specify the exact pickup location for renters.",
    "Double-check all information before submitting your listing.",
  ];

  return (
    <div className="w-full max-w-xl py-16 pr-14 flex flex-col gap-y-5">
      <h1 className="text-3xl font-semibold">List your vehicle</h1>
      <p className="text-muted-foreground text-lg">
        Fill out the details below to list your vehicle for rent. Accurate
        information helps renters find and book your vehicle with confidence.
      </p>
      <div className="bg-border p-4 rounded-2xl ">
        <h2 className="text-muted-foreground font-semibold mb-4">Tips</h2>
        <ul className="flex flex-col gap-y-4">
          {tips.map((tip, index) => {
            return (
              <li
                key={index}
                className="text-muted-foreground flex flex-row items-center gap-x-2 text-md"
              >
                <FaHandPointRight />
                <span className="">{tip}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PageSidebar;

"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  user: any;
}

const Navbar = ({ user }: NavbarProps) => {
  const mainPages = [
    {
      name: "Vehicles",
      link: "/search",
      url: "/scooter_logo.png",
    },
    {
      name: "About",
      link: "/about",
      url: "/about_logo.png",
    },
    {
      name: "Contact",
      link: "/contact",
      url: "/contact_logo.png",
    },
  ];
  return (
    <nav className="sticky top-0 bg-background shadow-sm z-50 flex flex-row items-center justify-between w-full mx-auto lg:px-16 md:px-10 sm:px-8 px-4">
      <Link
        href="/"
        className="h-20 flex items-center text-xl text-primary font-bold gap-2 hover:opacity-90 duration-200 ease-in-out transition-opacity hover:text-shadow-2xs group z-50 w-60"
      >
        <Image
          className="object-cover group-hover:transform group-hover:scale-110 duration-200 ease-in-out"
          src={"/sajilo_ride.png"}
          width={50}
          height={50}
          alt="sajilo-ride-logo"
          priority
        />
        Sajilo Ride
      </Link>
      <div className="flex w-full mx-auto flex-row gap-x-10 items-center justify-center">
        {mainPages.map((page, index) => {
          return (
            <Link
              key={index}
              href={page.link}
              className="flex flex-row gap-x-2 items-center hover:text-primary text-md font-semibold transition-colors duration-200 ease-in-out group"
            >
              <Image
                className="object-cover group-hover:transform group-hover:scale-110 duration-200 transition-all ease-in-out"
                src={page.url}
                width={50}
                height={50}
                alt={page.name}
                priority
              />
              {page.name}
            </Link>
          );
        })}
      </div>

      <div className="h-20 flex flex-row items-center justify-end gap-x-5 w-60">
        <Link
          href={user && user.isHost ? "/hosting" : "/create"}
          className="whitespace-nowrap py-2 px-4 bg-card text-md border border-border rounded-xl font-medium hover:bg-background text-accent-foreground transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
        >
          {user && user.isHost ? "Switch to hosting" : "Become a Host"}
        </Link>
        {user ? (
          <div className="w-12 h-12 bg-primary rounded-full shadow-sm border border-border" />
        ) : (
          <Link
            href="/login"
            className="whitespace-nowrap py-2 px-4 bg-primary text-md text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

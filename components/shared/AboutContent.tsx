"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-beam";

export function AboutContent() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {Contents.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black dark:bg-white text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className="text-xl mb-4">{item.title}</p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const Contents = [
  {
    title: "Hey we are team with passion",
    description: (
      <>
        <p>
          We&apos;re just two normal dudes who met in a classroom, probably
          while trying to look interested in a lecture. We didn&apos;t chat
          about Fetan back then, but it became clear we both had a shared
          passion for coding and a knack for turning random ideas into reality.
          Fast forward a few coding marathons and a lot of “What if we did
          this?” moments, and Fetan was born. We noticed that Ethiopian banks
          didn&apos;t have an API for their exchange rates and thought,
          &quot;Seriously, someone&apos;s got to fix this!&quot; So we did. With
          our free API, developers can now fetch daily bank rates without all
          the usual headaches. We&apos;re just two guys who wanted to make life
          easier for developers (and maybe have a bit of fun while doing it). We
          are cooking up something ! Buckle up—Fetan is just getting started,
          and the ride&apos;s going to be a blast! 🚀
        </p>
      </>
    ),
    badge: "Team",
    image: "/assets/logo(darkbackground).png",
  },
  {
    title: "Why Fetan?",
    description: (
      <>
        <p>
          Fetan is crafted by developers who know the struggles of finding
          reliable data. That&apos;s why we created it with developers in
          mind—because we&apos;ve been in your shoes and understand what you
          need. Our API is completely free (till mongodb charges us) and open
          source, giving you access to real-time exchange rates without any
          hidden costs. We believe in the power of open data and making tools
          accessible for everyone. After all, who doesn&apos;t love a free API
          that simplifies your work and makes life a little easier? At Fetan,
          we&apos;re all about supporting the developer community and providing
          a resource that&apos;s as straightforward and useful as possible.
        </p>
      </>
    ),
    badge: "Who we are",
  },
  {
    title: "Behind the scenes",
    description: (
      <>
        <p>
          We&apos;re Michael Seyoum and Nahom Teguade, fourth-year university
          students and the minds behind Fetan. Nahom is our system designer,
          crafting the architecture that keeps everything running smoothly.
          Michael handles the DevOps, ensuring that our API is robust and
          reliable. Together, we&apos;re committed to making real-time exchange
          rates accessible through our free, open-source API. We&apos;re
          passionate about using our skills to create tools that simplify life
          for developers and contribute to the tech community. contribute to the
          tech community.
        </p>
      </>
    ),
    badge: "Behind Fetan",
    image: "/assets/Team/Nahom & Michael.png",
    
  },
];

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface LocalSearchProps {
  route: string;
  imgSrc: string;
  placeHolder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  imgSrc,
  placeHolder,
  otherClasses,
}: LocalSearchProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = React.useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const url = formUrlQuery({
          params: window.location.search,
          key: "query",
          value: searchQuery,
        });

        router.push(url, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: window.location.search,
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, route, router, searchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] w-full 
      grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="Search"
        width={25}
        height={25}
        className="cursor-pointer"
      />
      <Input
        placeholder={placeHolder}
        className="text-dark400_light700 no-focus placeholder paragraph-regular 
        w-full border-none shadow-none outline-none"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default LocalSearch;

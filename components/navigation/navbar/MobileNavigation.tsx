import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="icons/hamburger.svg"
          width={36}
          height={36}
          alt="Open Navigation Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Devflow Logo"
          />

          <p
            className="h2-bold font-space-grotesk text-dark-100
      dark:text-light-900"
          >
            Dev <span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div
          className="no-scrollbar flex h-full 
        flex-col justify-between overflow-y-auto"
        >
          <SheetClose asChild>
            <section className="flex  flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3 py-6">
            {userId ?
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    className="small-medium light-border-2 btn-tertiary
                          text-dark400_light900 min-h-[41px] w-full rounded-lg 
                          border px-4 py-3 shadow-none"
                    type="submit"
                  >
                    <Image
                      src="/icons/log-out.svg"
                      alt="lock"
                      width={20}
                      height={20}
                      className="invert-colors"
                    />
                    <span className="text-dark300_light900">SignOut</span>
                  </Button>
                </form>
              </SheetClose>
            : <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button
                      className="small-medium btn-secondary min-h-[41px] 
                w-full rounded-lg px-4 py-3 shadow-none"
                    >
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button
                      className="small-medium light-border-2 btn-tertiary
                  text-dark400_light900 min-h-[41px] w-full rounded-lg 
                  border px-4 py-3 shadow-none"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            }
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;

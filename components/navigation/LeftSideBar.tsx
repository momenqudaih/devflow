import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

import NavLinks from "./navbar/NavLinks";
import { Button } from "../ui/button";

const LeftSideBar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <section
      className="custom-scrollbar background-light900_dark200 light-border 
      sticky left-0 top-5 flex h-screen flex-col justify-between gap-10 
      overflow-y-auto border-r p-6 pt-36 shadow-light-300 
      dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      <div className="flex flex-col justify-start gap-6">
        <NavLinks isMobileNav={false} userId={userId} />
      </div>
      <div className="flex flex-col gap-3">
        {userId ?
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
                className="invert-colors "
              />
              <span className="max-lg:hidden">SignOut</span>
            </Button>
          </form>
        : <>
            <Button
              className="small-medium btn-secondary min-h-[41px] 
                w-full rounded-lg px-4 py-3 shadow-none"
              asChild
            >
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  src="/icons/account.svg"
                  alt="lock"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />

                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Link>
            </Button>

            <Button
              className="small-medium light-border-2 btn-tertiary
                text-dark400_light900 min-h-[41px] w-full rounded-lg 
                border px-4 py-3 shadow-none"
              asChild
            >
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  src="/icons/sign-up.svg"
                  alt="lock"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Link>
            </Button>
          </>
        }
      </div>
    </section>
  );
};

export default LeftSideBar;

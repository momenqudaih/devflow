import { ReactNode } from "react";

import { auth } from "@/auth";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import Navbar from "@/components/navigation/navbar";
import RightSideBar from "@/components/navigation/RightSideBar";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <main className="background-light850_dark100 relative">
      <Navbar />

      <div className="flex">
        <LeftSideBar session={session} />
        <section
          className="flex min-h-screen flex-1 flex-col
          px-6 pb-6 pt-36 max-md:pt-14 sm:px-14"
        >
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default RootLayout;

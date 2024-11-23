import { ReactNode } from "react";

import Navbar from "@/components/navigation/navbar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="pt-[80px]">{children}</div>
    </main>
  );
};

export default AuthLayout;

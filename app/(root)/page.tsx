import Link from "next/link";

import { Button } from "@/components/ui/button";

const Home = async () => {
  return (
    <>
      <section className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href="/login">Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">Local Search bar</section>
      Filters Section
      <div className="mt-10 flex w-full flex-col gap-6">
        <p>Q Card</p>
        <p>Q Card</p>
        <p>Q Card</p>
        <p>Q Card</p>
      </div>
    </>
  );
};
export default Home;

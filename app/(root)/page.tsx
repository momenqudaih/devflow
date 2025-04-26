import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/actions/question.action";

interface searchParamsProps {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: searchParamsProps) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  return (
    <>
      <section className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href="/ask-question">Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeHolder="Search questions..."
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />

      {success ?
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length ?
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          : <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No Questions Found</p>
            </div>
          }
        </div>
      : <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      }
    </>
  );
};
export default Home;

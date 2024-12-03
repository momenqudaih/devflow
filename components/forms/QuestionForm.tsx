"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AskQuestionFormSchema } from "@/lib/validations";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionFormSchema>>({
    resolver: zodResolver(AskQuestionFormSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = (
    data: z.infer<typeof AskQuestionFormSchema>
  ) => {
    console.log(data);
  };

  const handleTagAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInputValue = e.currentTarget.value.trim();

      if (
        tagInputValue &&
        tagInputValue.length < 15 &&
        !field.value.includes(tagInputValue.toLowerCase())
      ) {
        form.setValue("tags", [...field.value, tagInputValue]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInputValue.length >= 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag length should be less than 15 characters",
        });
      } else if (field.value.includes(tagInputValue.toLowerCase())) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="What's your question?"
                  className="paragraph-regular background-light700_dark300 
                  light-border-2 text-dark300_light900 no-focus min-h-[56px] 
                  border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Detailed explanation of your problem?{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  fieldChange={field.onChange}
                  editorRef={editorRef}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex flex-col">
                  <Input
                    className="paragraph-regular background-light700_dark300 
                  light-border-2 text-dark300_light900 no-focus min-h-[56px] 
                  border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleTagAdd(e, field)}
                  />
                  {field.value.length > 0 ?
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          name={tag}
                          _id={Date.now().toString()}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  : null}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press Enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            Ask a Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
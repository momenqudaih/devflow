"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { SignInFormSchema } from "@/lib/validations";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInFormSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignIn;

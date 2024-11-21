"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpFormSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpFormSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;

"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./register.api";
import type { RegisterCredentials } from "../types";

/** Mutation de criação de conta — POST /auth/register via fetcher. */
export function useRegister() {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerUser(credentials),
  });
}

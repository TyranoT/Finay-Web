"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./auth.api";
import type { LoginCredentials } from "../types";

/** Mutation de autenticação — POST /auth/login via fetcher. */
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
  });
}

'use client';
import React, { createContext, useContext, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { useSessionContext } from "./session_context";
import { decodeTokenToSession } from "@/shared/helpers/decode_token";
interface IAuthContext {
    signout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const { setSessionData, clearSession, setStatus } = useSessionContext();

    const destroyAuthCookie = useCallback(() => {
        destroyCookie(null, "token", { path: "/" });
        destroyCookie(null, "lastArea");
    }, []);

    const signout = useCallback(() => {
        destroyAuthCookie();
        clearSession();
        router.replace("/");
    }, [destroyAuthCookie, clearSession, router]);

    const verificarAutenticacao = useCallback(() => {
        const { token } = parseCookies();

        if (!token) {
            console.log("❌ AuthContext: Sem token - definindo como não autenticado");
            setStatus("unauthenticated");
            return;
        }

        const decodedSession = decodeTokenToSession(token);

        if (!decodedSession) {
            console.log("❌ AuthContext: Token inválido ou expirado");
            destroyAuthCookie();
            clearSession();
            return;
        }

        setSessionData(decodedSession, token);
    }, [setSessionData, setStatus, clearSession, destroyAuthCookie]);

    useEffect(() => {
        verificarAutenticacao();
    }, [verificarAutenticacao]);

    return (
        <AuthContext.Provider value={{ signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
    }
    return context;
};
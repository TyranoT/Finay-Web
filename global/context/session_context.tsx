'use client';
import { decodeTokenToSession } from "@/shared/helpers/decode_token";
import { ISessionContext, ISessionValue } from "@/shared/types/session.type";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

const SessionContext = createContext<ISessionContext | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<ISessionValue | null>(null);
    const [token, setToken] = useState<string>("");
    const [status, setStatus] = useState<"authenticated" | "loading" | "unauthenticated">("loading");

    const setSessionData = useCallback((data: ISessionValue, tokenValue: string) => {
        setSession(data);
        setToken(tokenValue);
        setStatus("authenticated");
    }, []);

    const clearSession = useCallback(() => {
        setSession(null);
        setToken("");
        setStatus("unauthenticated");
    }, []);

    const signIn = useCallback((accessToken: string) => {
        const decodedSession = decodeTokenToSession(accessToken);
        
        if (!decodedSession) {
            console.error("❌ SessionContext: Token inválido ou não pôde ser decodificado");
            setStatus("unauthenticated");
            return;
        }

        setSessionData(decodedSession, accessToken);
    }, [setSessionData, setStatus]);

    const setor = session?.setor?.[0]?.setor || "";

    return (
        <SessionContext.Provider value={{ 
            session, 
            token, 
            status, 
            setor,
            setSessionData,
            clearSession,
            setStatus,
            signIn
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionContext deve ser usado dentro de um SessionProvider");
    }
    return context;
};


import jwt from "jsonwebtoken";
import { ISessionValue } from "../types/session.type";

/** Segundos de margem para clock skew entre cliente e emissor do JWT. */
const JWT_EXP_LEEWAY_SEC = 60;

function isExpiredPayload(payload: object): boolean {
    if (!("exp" in payload) || payload.exp == null) {
        return false;
    }
    const exp = (payload as { exp: unknown }).exp;
    if (typeof exp !== "number") {
        return false;
    }
    const nowSec = Math.floor(Date.now() / 1000);
    return exp < nowSec - JWT_EXP_LEEWAY_SEC;
}

export function decodeTokenToSession(token: string): ISessionValue | null {
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.decode(token);

        if (!decoded || typeof decoded === "string") {
            return null;
        }

        if (isExpiredPayload(decoded)) {
            return null;
        }

        return decoded as ISessionValue;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
}


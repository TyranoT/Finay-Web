'use client';

import { useAuthContext, useSessionContext } from "@/global";


export const useSession = () => {
    const sessionContext = useSessionContext();
    const authContext = useAuthContext();

    return {
        session: sessionContext.session,
        token: sessionContext.token,
        status: sessionContext.status,
        setor: sessionContext.setor,
        signout: authContext.signout,
        signIn: sessionContext.signIn,
    };
};



interface ResponseOkType<T> {
    msg: string;
    data: T;
    [key: string]: unknown;
}

/** Item em `errors[]` quando a API retorna validação detalhada (ex.: planilha com preços divergentes por código). */
export type ApiValidationListErrorDataItem = {
    codigo: string;
    descricao?: string;
    tipo?: string;
    valores_diferentes?: number[];
};

export type ApiValidationListErrorItem = {
    code: string;
    error: string;
    path: string;
    data?: ApiValidationListErrorDataItem[];
};

export interface ResponseErrorType {
    errors:
    | {
        default: string;
        [key: string]: string;
    }
    | ApiValidationListErrorItem[];
    msg: string;
}

export class ApiResponseError extends Error {
    readonly body: ResponseErrorType;
    constructor(body: ResponseErrorType) {
        super(body.msg);
        this.name = "ApiResponseError";
        this.body = body;
    }
}

export function isApiResponseError(err: unknown): err is ApiResponseError {
    return err instanceof ApiResponseError;
}

const baseUrl = process.env.NEXT_PUBLIC_BACK_URL || "";

export const fetcher = {
    async post<T, B>(path: string, token: string, body: B): Promise<ResponseOkType<T> | ResponseErrorType> {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        return await response.json();
                    } catch {
                        return {
                            errors: { default: `Erro ${response.status}: ${response.statusText}` },
                            msg: `Erro ao fazer requisição: ${response.statusText}`
                        };
                    }
                }
                return {
                    errors: { default: `Erro ${response.status}: ${response.statusText}` },
                    msg: `Erro ao fazer requisição: ${response.statusText}`
                };
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

            // Tratamento específico para ERR_EMPTY_RESPONSE e outros erros de rede
            if (errorMessage.includes("Failed to fetch") || errorMessage.includes("ERR_EMPTY_RESPONSE")) {
                return {
                    errors: { default: "Erro de conexão com o servidor. Verifique sua conexão e tente novamente." },
                    msg: "Erro ao fazer requisição"
                };
            }

            return {
                errors: { default: errorMessage },
                msg: "Erro ao fazer requisição"
            };
        }
    },

    async get<T>(path: string, token: string): Promise<ResponseOkType<T> | ResponseErrorType> {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        return await response.json();
                    } catch {
                        return {
                            errors: { default: `Erro ${response.status}: ${response.statusText}` },
                            msg: `Erro ao fazer requisição: ${response.statusText}`
                        };
                    }
                }
                return {
                    errors: { default: `Erro ${response.status}: ${response.statusText}` },
                    msg: `Erro ao fazer requisição: ${response.statusText}`
                };
            }

            return response.json();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            if (errorMessage.includes("Failed to fetch") || errorMessage.includes("ERR_EMPTY_RESPONSE")) {
                return {
                    errors: { default: "Erro de conexão com o servidor. Verifique sua conexão e tente novamente." },
                    msg: "Erro ao fazer requisição"
                };
            }
            return {
                errors: { default: errorMessage },
                msg: "Erro ao fazer requisição"
            };
        }
    },

    async put<T, B>(path: string, token: string, body: B): Promise<ResponseOkType<T> | ResponseErrorType> {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: "PUT",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        return await response.json();
                    } catch {
                        return {
                            errors: { default: `Erro ${response.status}: ${response.statusText}` },
                            msg: `Erro ao fazer requisição: ${response.statusText}`
                        };
                    }
                }
                return {
                    errors: { default: `Erro ${response.status}: ${response.statusText}` },
                    msg: `Erro ao fazer requisição: ${response.statusText}`
                };
            }

            return response.json();
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            return {
                errors: { default: error instanceof Error ? error.message : "Erro desconhecido" },
                msg: "Erro ao fazer requisição"
            };
        }
    },

    async delete<T>(path: string, token: string): Promise<ResponseOkType<T> | ResponseErrorType> {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        return await response.json();
                    } catch {
                        return {
                            errors: { default: `Erro ${response.status}: ${response.statusText}` },
                            msg: `Erro ao fazer requisição: ${response.statusText}`
                        };
                    }
                }
                return {
                    errors: { default: `Erro ${response.status}: ${response.statusText}` },
                    msg: `Erro ao fazer requisição: ${response.statusText}`
                };
            }

            return response.json();
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            return {
                errors: { default: error instanceof Error ? error.message : "Erro desconhecido" },
                msg: "Erro ao fazer requisição"
            };
        }
    },

    async patch<T, B>(path: string, token: string, body: B): Promise<ResponseOkType<T> | ResponseErrorType> {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        return await response.json();
                    } catch {
                        return {
                            errors: { default: `Erro ${response.status}: ${response.statusText}` },
                            msg: `Erro ao fazer requisição: ${response.statusText}`
                        };
                    }
                }
                return {
                    errors: { default: `Erro ${response.status}: ${response.statusText}` },
                    msg: `Erro ao fazer requisição: ${response.statusText}`
                };
            }

            return response.json();
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            return {
                errors: { default: error instanceof Error ? error.message : "Erro desconhecido" },
                msg: "Erro ao fazer requisição"
            };
        }
    },

    async deleteWithBody<T, B>(path: string, token: string, body: B): Promise<ResponseOkType<T> | ResponseErrorType> {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        return await response.json();
                    } catch {
                        return {
                            errors: { default: `Erro ${response.status}: ${response.statusText}` },
                            msg: `Erro ao fazer requisição: ${response.statusText}`
                        };
                    }
                }
                return {
                    errors: { default: `Erro ${response.status}: ${response.statusText}` },
                    msg: `Erro ao fazer requisição: ${response.statusText}`
                };
            }

            return response.json();
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            return {
                errors: { default: error instanceof Error ? error.message : "Erro desconhecido" },
                msg: "Erro ao fazer requisição"
            };
        }
    }
};

import { post } from "./http"
export const login = (params: any) => post("", params)
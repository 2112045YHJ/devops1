import axios from "axios";
import type { ProductDTO } from "../types/product";
const instance = axios.create({
  baseURL: "/api/product", //localhost:8080/api/product
  headers: { "Content-Type": "application/json" },
});

const multipartInstance = axios.create({
  baseURL: "/api/product",
});

export const productApi = {
  getList: () => instance.get<ProductDTO[]>("/list").then((res) => res.data),
  getDetail: (num: number) =>
    instance.get<ProductDTO>(`/detail/${num}`).then((res) => res.data),
  insert: (data: FormData) =>
    multipartInstance.post<string>("/insert", data).then((res) => res.data),
  update: (data: FormData) =>
    multipartInstance.post<string>("/update", data).then((res) => res.data),
  delete: (num: number) =>
    instance.delete<string>(`/delete/${num}`).then((res) => res.data),
};

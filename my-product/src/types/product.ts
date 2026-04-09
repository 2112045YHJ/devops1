export interface ProductDTO {
  num: number;
  name: string;
  price: number;
  amount: number;
  storedFilePath?: string;
  uploadFile?: File | null;
}

export type ProductInput = Omit<ProductDTO, "num">;

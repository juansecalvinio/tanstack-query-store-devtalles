import { type Product, productApi } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  await sleep(1);
  const filterUrl = filterKey ? `category=${filterKey}` : "";
  const { data } = await productApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productApi.get<Product>(`/products/${id}`);
  return data;
};

type NewProduct = Omit<Product, "id" | "rating">;

export const createProduct = async (product: NewProduct) => {
  await sleep(5);

  const { data } = await productApi.post("/products", product);
  return data;
};

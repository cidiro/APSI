export type Product = {
	name: string;
	stock: number;
	description: number;
	price: number;
  };


  export type Client = {
	name: string;
	cif: string;
  };


  export type Invoice = {
	client: string;
	products: Product[];
	total: number;
  };

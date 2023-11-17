export type Mortgage = {
	amount: number;
	terms: number;
	terms_remaining: number;
	client_id: string;
	manager_id: string;
};

export type Client = {
	name: string;
	email: string;
	phone: number;
	balance: number;
	mortgages: string[];
	id: string;
	manager_id: string;
};

export type Manager = {
	name: string;
	email: string;
	phone: string;
	clients: string[];
	id: number;
};

import { IUser } from './user';
import { IProduct } from './product';

interface ITransactionProduct {
    id: number;
    quantity: number;
    product: IProduct;
}

export interface ITransactions {
    id: number;
    total_price: number;
    user: IUser;
    created_at: string;
    updated_at: string;
    products: ITransactionProduct[];
}

import { IBrand } from './brand';
import { IFilter } from './filter';
import { IFilterableList, IPaginatedList } from './list';
import {ICategory, IShopCategory} from './category';
import {ImageBanner} from "./imageBanner";
import {IReview} from "./review";
import {ISpec} from "./spec";
import exp from "constants";
import {IVariant} from "./variant";
import {ICollection} from "./collection";
import {IQuestion} from "./question";

export interface IProductAttributeValue {
    slug: string;
    name: string;
}

export interface IProductAttribute {
    slug: string;
    name: string;
    values: IProductAttributeValue[];
    featured: boolean;
}

export interface IProduct {
    id: number;
    code: string;
    title: string;
    is_featured: boolean;
    is_hot: boolean;
    price: number;
    sale_price: number;
    vendor: string;
    review: number;
    is_out_of_stock: boolean;
    depot: number;
    inventory: number;
    is_active: boolean;
    is_sale: boolean;
    descripcion: string;
    created_at: string;
    updated_at: string;
    variants: IVariant[];
    caracteristicas: ICharacteristic[];
    images : ImageBanner[];
    banners: ImageBanner[];
    product_categories: ICategory[];
    brands: IBrand[];
    collections: ICollection[];
    reviews: IReview[];
    preguntas: IQuestion[];
    especificaciones: ISpec[];
    resumenOpiniones: IOptionsSummary;
    slug: string;
    model:string;
}

export interface IOptionsSummary {
    promedio: number;
    cantidad1: number;
    cantidad2: number;
    cantidad3: number;
    cantidad4: number;
    cantidad5: number;
}

export interface ICharacteristic{
    id: number;
    descripcion: string;
    title:string;
}

export type IProductsList = IPaginatedList<IProduct> & IFilterableList<IProduct, IFilter>;

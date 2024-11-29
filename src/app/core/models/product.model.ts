// src/app/core/models/product.model.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    variants: ProductVariant[];
  }
  
  export interface ProductVariant {
    info: string;
    price: number;
  }
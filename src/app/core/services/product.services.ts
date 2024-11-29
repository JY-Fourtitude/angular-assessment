import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  async getProducts(): Promise<Product[]> {
    const response = await firstValueFrom(
      this.http.get<Product[]>(`${environment.apiUrl}/products`)
    );
    
    if (!response) {
      return [];
    }
    
    return response;
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await firstValueFrom(
        this.http.get<Product>(`${environment.apiUrl}/products/${id}`)
      );
      
      if (!product) {
        return null;
      }
      
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }
}
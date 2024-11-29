import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.services';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (products.length) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (product of products; track product.id) {
          <div class="product-card">
            <img [src]="product.imagePath" [alt]="product.name">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <a [routerLink]="['/products', product.id]">View Details</a>
          </div>
        } @empty {
          <p>No products found</p>
        }
      </div>
    } @else {
      <p>Loading products...</p>
    }
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.productService.getProducts();
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }
}
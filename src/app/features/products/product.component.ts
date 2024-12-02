import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  imageLoaded = false;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.productService.getProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  truncateDescription(text: string, maxLength: number = 50): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  getPriceRange(variants: any[]): string {
    if (!variants || variants.length === 0) return 'N/A';
    const prices = variants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `${min.toLocaleString()} - ${max.toLocaleString()}`;
  }

  private preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  }

  async openProductModal(content: any, productId: number): Promise<void> {
    try {
      // Reset image loaded state
      this.imageLoaded = false;
      
      // Get product details
      this.selectedProduct = await this.productService.getProductById(productId);
      
      if (this.selectedProduct && this.selectedProduct.imagePath) {
        try {
          // Preload the image before opening the modal
          await this.preloadImage(this.selectedProduct.imagePath);
          this.imageLoaded = true;
        } catch (error) {
          console.error('Error preloading image:', error);
          // Continue with modal opening even if image fails to preload
          // The fallback image will be shown via onerror handler
        }
        
        // Open the modal
        await this.modalService.open(content, { 
          size: 'lg',
          centered: true,
          beforeDismiss: () => {
            // Reset image loaded state when modal closes
            this.imageLoaded = false;
            return true;
          }
        }).result;
      }
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }
}
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  // =========================
  // STATE
  // =========================
  products: Product[] = [];
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  errorMessage = '';

  ngOnInit(): void {
    console.log('COMPONENTE PRODUCT LIST ACTIVO');
    this.loadProducts();
  }

  // =========================
  // LOAD PRODUCTS
  // =========================
  loadProducts(): void {

    this.productService.getProducts()
      .subscribe({
        next: (data) => {

          console.log('DATA API:', data);

          this.products = Array.isArray(data) ? data : [];

          // FORZAR REFRESH DE UI
          this.cdr.detectChanges();

          console.log('PRODUCTS STATE:', this.products);
        },
        error: () => {
          this.errorMessage = 'Error al cargar productos';
        }
      });
  }

  // =========================
  // FILTER (SIN ESTADO EXTRA)
  // =========================
  get filteredProducts(): Product[] {

    const term = this.searchTerm?.trim().toLowerCase() || '';

    if (!term) {
      return this.products;
    }

    return this.products.filter(p =>
      p.name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    );
  }

  // =========================
  // PAGINATION
  // =========================
  get paginatedProducts(): Product[] {

    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  onSearch(): void {
    this.currentPage = 1;
  }

  // =========================
  // DELETE PRODUCT
  // =========================
  deleteProduct(id: number): void {

    if (!confirm('¿Eliminar producto?')) return;

    this.productService.deleteProduct(id)
      .subscribe({
        next: () => this.loadProducts(),
        error: () => this.errorMessage = 'Error al eliminar producto'
      });
  }

  // =========================
  // ROLE CHECK
  // =========================
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
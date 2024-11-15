import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CartDetail, CartDetailResponse } from 'src/app/shared/types/cart/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  page: number = 1;
  itemsPerPage: number = 4;
  descending = false;
  totalItems: number = 0;
  itemsCart: CartDetail[] = [];
  totalPrices: number = 0;
  categoryName: string = '';
  brandName: string = '';
  filtersVisible: boolean = false;
  orderBy = 'ASC';

  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.fetchCarts();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
    this.fetchCarts();
  }  

  fetchCarts() {
    console.log(this.categoryName);
    console.log(this.brandName);
    this.cartService.getCart(this.page - 1, this.itemsPerPage, this.descending, this.categoryName, this.brandName).subscribe({
      next: (response: CartDetailResponse) => {
        this.totalPrices = response.totalPrice;
        this.itemsCart = response.cartDetail;
        this.totalItems = response.totalItems;
      },
      error: (error) => {
        console.error('Error al cargar el carrito', error);
      }
    });
  }

  onControlsChange(event: { itemsPerPage: number; descending: boolean; page: number }) {
    this.itemsPerPage = event.itemsPerPage;
    this.descending = event.descending;
    this.orderBy = this.descending ? 'DES' :'ASC';
    this.page = event.page;
    this.fetchCarts();
  }

  onClose(): void {
    this.close.emit();
  }

  removeItem(index: number): void {
    this.itemsCart.splice(index, 1);
  }

  formatPrice(price: number): string {
    const formattedNumber = price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `$${formattedNumber}`;
  }
}

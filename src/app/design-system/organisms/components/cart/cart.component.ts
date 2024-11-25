import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/constants';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CartDetail, CartDetailResponse } from 'src/app/shared/types/cart/cart';
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';

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

  message: string = "";
  isMessagess: boolean = false;
  status: string = "sucess";
  srcImage: string = "";
  isSuccessful: boolean = false;

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

  removeItem(idArticle: number): void {
    this.cartService.deleteCart(idArticle).subscribe({
      next: (response: ResponseSuccess) => {
        this.message =  response.messages; 
        this.isMessagess = true;  
        this.status = "success";
        this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
        this.isSuccessful = true;
        
        
        setTimeout(() => {
          this.isMessagess = false;
          this.onClose();
        }, 4000);
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(error.status == 409 || error.status == 400){
          this.status = "warning";
          this.srcImage = AppConstants.SRC_IMAGE_WARNING;   
        } else {
          this.status = "error";
          this.srcImage = AppConstants.SRC_IMAGE_ERROR;   
        }
        this.message = error.message;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);
      }
    });
  }

  formatPrice(price: number): string {
    const formattedNumber = price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `$${formattedNumber}`;
  }

  buy(): void {
    this.cartService.buy().subscribe({
      next: (response: ResponseSuccess) => {
        this.message =  response.messages; 
        this.isMessagess = true;  
        this.status = "success";
        this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
        this.isSuccessful = true;
        this.fetchCarts();
        
        setTimeout(() => {
          this.isMessagess = false;
        }, 4000);
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(error.status == 409 || error.status == 400){
          this.status = "warning";
          this.srcImage = AppConstants.SRC_IMAGE_WARNING;   
        } else {
          this.status = "error";
          this.srcImage = AppConstants.SRC_IMAGE_ERROR;   
        }
        this.message = error.message;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);
      }
    });
  }
}
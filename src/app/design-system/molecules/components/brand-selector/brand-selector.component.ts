import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { Brand } from 'src/app/shared/types/brand';
import { PaginationDto } from 'src/app/shared/types/paginationDto';

@Component({
    selector: 'app-brand-selector',
    templateUrl: './brand-selector.component.html',
    styleUrls: ['./brand-selector.component.scss']
})
export class BrandSelectorComponent implements OnInit {
    brands: Brand[] = [];
    selectedBrand: number | 0 = 0;
    totalElemnts: number = 1;
    dropdownOpen: boolean = false;
    searchQuery: string = '';
    filteredBrands: Brand[] = []; 
  
    @Output() selectedBrandChange = new EventEmitter<number>();
  
    constructor(private brandService: BrandService) {}
  
    ngOnInit() {
        this.getSingleBrand(0,1);
    }

    getSingleBrand(pagina: number, limite: number) {
        this.brandService.getAllBrand(pagina, limite,false).subscribe({
          next: (response: PaginationDto<Brand>) => {
              this.brands = response.contentList;
              this.filteredBrands = this.brands;
              this.totalElemnts = response.totalElement;
              this.getBrands(0,this.totalElemnts);
          },
          error: (error) => {
              console.error('Error al cargar las Marcas', error);
          }
          });
      }
  
    getBrands(pagina: number, limite: number) {
      this.brandService.getAllBrand(pagina, limite,false).subscribe({
        next: (response: PaginationDto<Brand>) => {
            this.brands = response.contentList;
            this.filteredBrands = this.brands;
            this.totalElemnts = response.totalElement;
        },
        error: (error) => {
            console.error('Error al cargar las Marcas', error);
        }
        });
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    onBrandSelect(brandId: number) {
    this.selectedBrand = brandId;
    this.selectedBrandChange.emit(this.selectedBrand);
    this.dropdownOpen = false;
    }

    getSelectedBrandName(): string {
    const selected = this.brands.find(brand => brand.id === this.selectedBrand);
    return selected ? selected.name : '';
    }
  
    onBrandChange() {
      this.selectedBrandChange.emit(this.selectedBrand);
    }

    filterBrands() {
        if (!this.searchQuery.trim()) {
          this.filteredBrands = this.brands;
        } else {
          this.filteredBrands = this.brands.filter(brand =>
            brand.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
      }
  }
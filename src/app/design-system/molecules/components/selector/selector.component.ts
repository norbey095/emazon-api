import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/shared/services/stock/article/article.service';
import { BrandService } from 'src/app/shared/services/stock/brand/brand.service';
import { ArticleList } from 'src/app/shared/types/stop/article';
import { Brand } from 'src/app/shared/types/stop/brand';
import { PaginationDto } from 'src/app/shared/types/stop/paginationDto';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  items: Brand[] | ArticleList[] = [];
  selectedItem: number = 0;
  totalElemnts: number = 1;
  dropdownOpen: boolean = false;
  searchQuery: string = '';
  filteredItems: Brand[] | ArticleList[] = [];
  itemName = '';
  @Input() isBrand: boolean = true;
  
  @Output() selectedItemChange = new EventEmitter<number>();
  
  constructor(private brandService: BrandService, private articleService: ArticleService) {}
  
  ngOnInit() {
    if (this.isBrand) {
      this.getBrand(0, 1, true);
      this.itemName = "Marca";
    } else {
      this.getArticle(0, 1, true);
      this.itemName = "Articulo";
    }        
  }

  getBrand(pagina: number, limite: number, isFirst: boolean) {
    this.brandService.getAllBrand(pagina, limite, false).subscribe({
      next: (response: PaginationDto<Brand>) => {
        this.items = response.contentList;
        this.filteredItems = this.items;
        this.totalElemnts = response.totalElement;
        if (isFirst) {
          this.getBrand(0, this.totalElemnts, false);
        }
      },
      error: (error) => {
        console.error('Error al cargar las Marcas', error);
      }
    });
  }

  getArticle(pagina: number, limite: number, isFirst: boolean) {
    this.articleService.getAllArticles(pagina, limite, false, 'article').subscribe({
      next: (response: PaginationDto<ArticleList>) => {
        this.items = response.contentList;
        this.filteredItems = this.items;
        this.totalElemnts = response.totalElement;
        if (isFirst) {
          this.getArticle(0, this.totalElemnts, false);
        }
      },
      error: (error) => {
        console.error('Error al cargar los articulos', error);
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onItemSelect(id: number) {
    this.selectedItem = id;
    this.selectedItemChange.emit(this.selectedItem);
    this.dropdownOpen = false;
  }

  getSelectedItemName(): string {
    const selected = this.items.find(item => item.id === this.selectedItem);
    return selected ? selected.name : '';
  }

  onItemChange() {
    this.selectedItemChange.emit(this.selectedItem);
  }

  filterItems() {
    if (!this.searchQuery.trim()) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  reset() {
    this.selectedItem = 0;
    this.selectedItemChange.emit(this.selectedItem);
  }
}

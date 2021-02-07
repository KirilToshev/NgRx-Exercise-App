import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { State, getShowProductCodeSelector, getCurrentProductSelector, getProductsSelector, getProductErrorSelector } from '../store/product.reducer';
import * as ProductActions from '../store/product.actions'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProductSelector);
    this.products$ = this.store.select(getProductsSelector);
    this.displayCode$ = this.store.select(getShowProductCodeSelector);
    this.errorMessage$ = this.store.select(getProductErrorSelector);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProductCode());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProductCode({ product }));
  }
}

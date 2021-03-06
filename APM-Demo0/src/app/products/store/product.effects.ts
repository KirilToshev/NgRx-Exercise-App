import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from '../store/product.actions'
import { mergeMap, map, catchError, switchMap, concatMap } from 'rxjs/operators';
import { of, merge } from 'rxjs';

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {
    }

    loadProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({products})),
                catchError(error =>
                    of(ProductActions.loadProductsFailure({error}))
                )
            ))
        )
    });

    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            concatMap(action => 
                this.productService.updateProduct(action.product).pipe(
                map(product => ProductActions.updateProductSuccess({product})),
                catchError(
                    error => of(ProductActions.updateProductFailure({error}))
                )
            ))
        ) 
    });
}
import { createAction, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store'
import * as AppState from '../../store/app.state';
import { Product } from '../product';

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}

const productFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCodeSelector = createSelector(
    productFeatureSelector,
    productState => productState.showProductCode
);

export const getCurrentProductSelector = createSelector(
    productFeatureSelector,
    productState => productState.currentProduct
);

export const getProductsSelector = createSelector(
    productFeatureSelector,
    productState => productState.products
);

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean,
    currentProduct: Product,
    products: Product[]
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    })
);
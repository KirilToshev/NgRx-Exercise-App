import { createAction, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store'
import * as AppState from '../../store/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
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

export const getProductErrorSelector = createSelector(
    productFeatureSelector,
    productState => productState.error
)

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean,
    currentProduct: Product,
    products: Product[],
    error: string
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProductCode, 
        (state, action): ProductState => {
            return {
                ...state,
                currentProduct: action.product
            };
        }),
    on(ProductActions.clearCurrentProductCode, (state): ProductState => {
        return {
            ...state,
            currentProduct: null
        }
    }),
    on(ProductActions.initializeCurrentProductCode, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: '',
                description: '',
                starRating: 0
            }
        }
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState =>{
        return{
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error,
            products: []
        }
    })
);
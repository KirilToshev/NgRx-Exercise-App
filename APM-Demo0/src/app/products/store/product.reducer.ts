import { createAction, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store'
import * as AppState from '../../store/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

const productFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCodeSelector = createSelector(
    productFeatureSelector,
    productState => productState.showProductCode
);

export const getCurrentProductIdSelector = createSelector(
    productFeatureSelector,
    productState => productState.currentProductId
)

export const getCurrentProductSelector = createSelector(
    productFeatureSelector,
    getCurrentProductIdSelector,
    (productState, currentProductId) => {
        let product = {
            id: 0,
            productName: '',
            productCode: '',
            description: '',
            starRating: 0
        }

        if (currentProductId !== 0) {
            product = currentProductId ? productState.products.find(p => p.id === currentProductId) : null;
        }

        return product;
    }
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
    currentProductId: number | null,
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
    on(ProductActions.setCurrentProductId,
        (state, action): ProductState => {
            return {
                ...state,
                currentProductId: action.currentProductId
            };
        }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
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
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(p => p.id === action.product.id ? action.product : p);
        return {
            ...state,
            currentProductId: action.product.id,
            products: updatedProducts,
            error: ''
        }
    }),
    on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
);
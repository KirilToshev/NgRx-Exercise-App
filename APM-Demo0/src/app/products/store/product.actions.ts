import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);
export const setCurrentProductCode = createAction(
    '[Product] Set Current Product Code',
    props<{ product: Product }>()
);
export const clearCurrentProductCode = createAction(
    '[Product] Clear Current Product Code'
);
export const initializeCurrentProductCode = createAction(
    '[Product] Initialize Current Product Code'
);
export const LoadProducts = createAction(
    '[Product] Load Products'
);

export const LoadProductsSuccess = createAction(
    '[Product] Load Products Success'
);

export const LoadProductsFailure = createAction(
    '[Product] Load Products Failure'
);
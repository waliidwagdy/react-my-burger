import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};


export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(fetchIngredientFailed());
            });
    }
};
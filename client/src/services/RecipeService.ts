import axios from 'axios';

import {RecipeType, MainIngredient, Season,
    PagingOptions, RecipeFiltersInterface, PagedResults} from '../../../common/models';

export class RecipeService {

    constructor() {
    }

    public getRecipes(options: PagingOptions, filters: RecipeFiltersInterface): Promise<PagedResults> {
        return axios.get('http://localhost:8000/recipes', { params: { options, filters }}).then((res) => {
            return res.data;
        });
    }

    public createRecipe() {
        axios.post('http://localhost:8000/recipes', {body: 'test'}).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log('ERROR', error);
        });
    }

    public getFilterOptions() {
        return {
            recipeTypes: [
                { id: 0, value: "", name: 'recipeTypes.recipeType' },
                { id: 1, value: RecipeType.SNACK, name: "recipeTypes.snack" },
                { id: 2, value: RecipeType.MEAL, name: "recipeTypes.meal" },
                { id: 3, value: RecipeType.DESSERT, name: "recipeTypes.dessert" },
            ],
            mainIngredients: [
                { id: 0, value: "", name: "mainIngredients.mainIngredient" },
                { id: 1, value: MainIngredient.BIRD, name: "mainIngredients.bird" },
                { id: 2, value: MainIngredient.FISH, name: "mainIngredients.fish" },
                { id: 3, value: MainIngredient.MEAT, name: "mainIngredients.meat" },
                { id: 4, value: MainIngredient.VEGETABLE, name: "mainIngredients.vegetable" },
            ],
            seasons: [
                { id: 0, value: "", name: "seasons.season" },
                { id: 1, value: Season.SUMMER, name: "seasons.summer" },
                { id: 2, value: Season.FALL, name: "seasons.fall" },
                { id: 3, value: Season.WINTER, name: "seasons.winter" },
                { id: 4, value: Season.SPRING, name: "seasons.spring" },
            ]
        };
    }
}

export const recipeService = new RecipeService();
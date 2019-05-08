import axios from 'axios';
import { Recipe, MainIngredient, PagedResults, PagingOptions, RecipeFiltersInterface, RecipeType, Season, Unit } from '../../../common/models';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.error('Request failed!', error);
    return Promise.reject(error);
});

export class RecipeService {

    constructor() {
    }

    public async getRecipes(options: PagingOptions, filters: RecipeFiltersInterface): Promise<PagedResults> {
        const result = await axios.get('/api/recipes', { params: { options, filters }});
        return result.data;
    }

    public async getRecipe(id: String): Promise<Recipe> {
        const result = await axios.get('/api/recipe', { params: {id} });
        return result.data;
    }

    public async createRecipe(recipe: Recipe): Promise<Recipe> {
        const result = await axios.post('/api/recipe', recipe);
        return result.data;
    }

    public async updateRecipe(recipe: Recipe): Promise<Recipe> {
        const result = await axios.put('/api/recipe', recipe);
        return result.data;
    }

    public async deleteRecipe(id: string): Promise<string> {
        const result = await axios.delete('/api/recipe', { params: {id} });
        return result.data;
    }

    public createRecipePlaceholder(): Recipe {
        return {
            id: '',
            _id: undefined, // MongoDB specific
            datetime: '',
            name: '',
            type: RecipeType.MEAL,
            season: undefined,
            mainIngredient: MainIngredient.VEGETABLE,
            ingredients: [{
                id: Date.now().toString(),
                name: '',
                quantity: undefined,
                unit: undefined
            }],
            instructions: '',
            image: ''
        }
    }

    public getFilterOptions() {
        return {
            recipeTypes: [
                { id: 1, value: RecipeType.SNACK, name: "recipeTypes.snack" },
                { id: 2, value: RecipeType.MEAL, name: "recipeTypes.meal" },
                { id: 3, value: RecipeType.DESSERT, name: "recipeTypes.dessert" },
            ],
            mainIngredients: [
                { id: 1, value: MainIngredient.BIRD, name: "mainIngredients.bird" },
                { id: 2, value: MainIngredient.FISH, name: "mainIngredients.fish" },
                { id: 3, value: MainIngredient.MEAT, name: "mainIngredients.meat" },
                { id: 4, value: MainIngredient.VEGETABLE, name: "mainIngredients.vegetable" },
            ],
            seasons: [
                { id: 1, value: Season.SUMMER, name: "seasons.summer" },
                { id: 2, value: Season.FALL, name: "seasons.fall" },
                { id: 3, value: Season.WINTER, name: "seasons.winter" },
                { id: 4, value: Season.SPRING, name: "seasons.spring" },
            ]
        };
    }

    public getUnitOptions() {
        return [
            { id: 1, value: Unit.ML, name: "units.ml" },
            { id: 2, value: Unit.DL, name: "units.dl" },
            { id: 3, value: Unit.L, name: "units.l" },
            { id: 4, value: Unit.G, name: "units.g" },
            { id: 5, value: Unit.KG, name: "units.kg" },
            { id: 6, value: Unit.TBSP, name: "units.tbsp" },
            { id: 7, value: Unit.TSP, name: "units.tsp" },
        ]
    }
}

export const recipeService = new RecipeService();
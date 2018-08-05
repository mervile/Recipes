export enum RecipeType { SNACK, MEAL, DESSERT } 

export enum MainIngredient { FISH, BIRD, VEGETABLE, MEAT, OTHER }

export enum Season { SUMMER, FALL, WINTER, SPRING }

export enum Unit { ML, DL, L, G, KG, TSP, TBSP }

export interface Ingredient {
    id: string,
    name: string,
    quantity: number,
    unit: Unit
}

export interface GridItemInterface {
    readonly id: string,
    name: string
}

export interface Recipe extends GridItemInterface {
    readonly datetime: string,
    type: RecipeType,
    mainIngredient: MainIngredient,
    season?: Season,
    ingredients: Array<Ingredient>,
    image?: string,
    instructions?: string
}

export interface PagingOptions {
    page: number,
    itemsPerPage: number,
    sortBy?: string,
    asc?: boolean
}

export interface PagedResults extends PagingOptions {
    items: Array<Recipe>,
    total: number,
    filters: RecipeFiltersInterface
}

export interface RecipeFiltersInterface {
    searchText: string,
    season: Season | string,
    mainIngredient: MainIngredient | string,
    type: RecipeType | string
}

export class RecipeService {

    constructor() {
    }

    public getRecipes(options: PagingOptions, filters: RecipeFiltersInterface): Promise<PagedResults> {
        const pro = new Promise<PagedResults>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() >= 0.1) {
                    const recipes: Array<Recipe> = this.filterRecipes(this.generateMockRecipes(), filters);
                    const from = options.page*options.itemsPerPage;
                    const to = from + options.itemsPerPage;
                    const result = Object.assign(options, {
                        total: recipes.length,
                        filters,
                        items: recipes.slice(from, to)
                    });
                    resolve(result);
                } else {
                    reject(new Error('Error with recipes!'))
                }
            }, 1000);
        });
        return pro;
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

    private filterRecipes(recipes: Array<Recipe>, filters: RecipeFiltersInterface) {
        return recipes.filter(recipe => {
            if ((filters.mainIngredient !== "" && filters.mainIngredient !== recipe.mainIngredient)
                || (filters.searchText && JSON.stringify(recipe).match(filters.searchText) === null)
                || (filters.season !== "" && filters.season !== recipe.season)
                || (filters.type !== "" && filters.type !== recipe.type)) {
                return false;
            }
            return true;
        });
    }

    private generateMockRecipes() {
        const recipes: Array<Recipe> = [];
        for (let i = 0; i < 14; i++) {
            let type = Math.random() >= 0.5 ? RecipeType.DESSERT : RecipeType.MEAL; 
            recipes.push({
                id: i.toString(),
                datetime: Date.now().toString(),
                name: type === RecipeType.DESSERT ? 'Maailman paras pikkuleipä' : 'Broileri-vuohenjuusto parsakaalilla ja bataatilla',
                type,
                mainIngredient: MainIngredient.OTHER,
                season: undefined,
                ingredients: [],
                image: '',
                instructions: 'Näin tehdään maailman parhaat pikkuleivät...'
            });
        }
        return recipes;
    }
}

export const recipeService = new RecipeService();
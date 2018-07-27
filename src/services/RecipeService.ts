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
    total: number
}

export interface RecipeFiltersInterface {
    searchText?: string,
    season?: Season,
    mainIngredient?: MainIngredient,
    type?: RecipeType
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
                        items: recipes.slice(from, to)
                    });
                    console.log('result', result);
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
                { id: 1, value: "snack", name: "recipeTypes.snack" },
                { id: 2, value: "meal", name: "recipeTypes.meal" },
                { id: 3, value: "dessert", name: "recipeTypes.dessert" },
            ],
            mainIngredients: [
                { id: 0, value: "", name: "mainIngredients.mainIngredient" },
                { id: 1, value: "bird", name: "mainIngredients.bird" },
                { id: 2, value: "fish", name: "mainIngredients.fish" },
                { id: 3, value: "meat", name: "mainIngredients.meat" },
                { id: 4, value: "vegetable", name: "mainIngredients.vegetable" },
            ],
            seasons: [
                { id: 0, value: "", name: "seasons.season" },
                { id: 1, value: "summer", name: "seasons.summer" },
                { id: 2, value: "fall", name: "seasons.fall" },
                { id: 3, value: "winter", name: "seasons.winter" },
                { id: 4, value: "spring", name: "seasons.spring" },
            ]
        };
    }

    private filterRecipes(recipes: Array<Recipe>, filters: RecipeFiltersInterface) {
        return recipes.filter(recipe => {
            return (!filters.searchText || JSON.stringify(recipe).match(filters.searchText) !== null)
                && (!filters.mainIngredient || filters.mainIngredient === recipe.mainIngredient)
                && (!filters.season || filters.season === recipe.season)
                && (!filters.type || filters.type === recipe.type)
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
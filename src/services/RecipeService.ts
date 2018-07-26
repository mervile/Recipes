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

export class RecipeService {

    constructor() {
    }

    public getRecipes(options: PagingOptions): Promise<PagedResults> {
        console.log('getRecipes options', options);
        const pro = new Promise<PagedResults>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() >= 0.1) {
                    // TODO TSLINT
                    const recipes: Array<Recipe> = this.generateMockRecipes();
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
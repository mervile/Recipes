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

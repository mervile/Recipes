export enum RecipeType { SNACK, MEAL, DESSERT } 

export enum MainIngredient { FISH, BIRD, VEGETABLE, MEAT }

export enum Season { SUMMER, FALL, WINTER, SPRING }

export enum Unit { ML = "ml", DL = "dl", L = "l", G = "g", KG = "kg", TSP = "tsp", TBSP = "tbsp" }

export interface Ingredient {
    id: string,
    name: string,
    quantity?: number,
    unit?: Unit
}

export interface GridItemInterface {
    readonly id: string,
    name: string
}

export interface Recipe extends GridItemInterface {
    readonly datetime: string,
    _id: any,
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

export enum MarkerType {
    BLUEBERRY,
    LINGONBERRY,
    MUSHROOM
}

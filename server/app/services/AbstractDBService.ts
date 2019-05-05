import { Recipe, RecipeFiltersInterface } from "../../../common/models";

export default abstract class DBService {

    constructor() {}

    abstract async connect();

    abstract async close();

    abstract async insertRecipe(recipe: Recipe): Promise<Recipe>;

    abstract async findRecipes(filters: RecipeFiltersInterface): Promise<Array<Recipe>>;

    abstract async findRecipeById(id: string): Promise<Recipe>;

    abstract async updateRecipe(recipe: Recipe): Promise<Recipe>;

    abstract async removeRecipe(id: string);
}

import * as _ from 'lodash';
import {Recipe, PagedResults, RecipeFiltersInterface, RecipeType, Season, MainIngredient} from '../../../common/models';

const recipes: Array<Recipe> = [
    {
        id: '0',
        datetime: Date.now().toString(),
        name: 'Maailman paras pikkuleipä',
        type: RecipeType.DESSERT,
        mainIngredient: MainIngredient.OTHER,
        season: undefined,
        ingredients: [],
        image: '',
        instructions: 'Näin tehdään maailman parhaat pikkuleivät...'
    },
    {
        id: '1',
        datetime: Date.now().toString(),
        name: 'Broileri-vuohenjuusto parsakaalilla ja bataatilla',
        type: RecipeType.MEAL,
        mainIngredient: 1,
        season: undefined,
        ingredients: [],
        image: '',
        instructions: 'Näin tehdään...'
    },
    {
        id: '2',
        datetime: Date.now().toString(),
        name: 'Lohikeitto',
        type: RecipeType.MEAL,
        mainIngredient: MainIngredient.FISH,
        season: Season.SPRING,
        ingredients: [],
        image: '',
        instructions: 'Näin tehdään...'
    },
    {
        id: '3',
        datetime: Date.now().toString(),
        name: 'Voileipä',
        type: RecipeType.SNACK,
        mainIngredient: MainIngredient.MEAT,
        season: undefined,
        ingredients: [],
        image: '',
        instructions: 'Näin tehdään...'
    }
];

function filterRecipes(recipes: Array<Recipe>, filters: RecipeFiltersInterface) {
    return recipes.filter(recipe => {
        if ((filters.mainIngredient !== '' && filters.mainIngredient !== recipe.mainIngredient)
            || (filters.searchText !== '' && JSON.stringify(recipe).match(filters.searchText) === null)
            || (filters.season !== '' && filters.season !== recipe.season)
            || (filters.type !== '' && filters.type !== recipe.type)) {
                return false;
        }
        return true;
    });
}

export default function recipeRoutes(app, db) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.post('/recipes', (req, res) => {
        const recipe = req.body;
        recipe.id = _.last(recipes).id + 1;
        recipe.datetime = Date.now();
        recipes.push(recipe);
        res.send(recipe);
    });

    app.get('/recipes', (req, res) => {
        let {options, filters} = req.query;
        options = JSON.parse(options);
        filters = JSON.parse(filters);
        const items: Array<Recipe> = filterRecipes(recipes, filters);
        const from = options.page*options.itemsPerPage;
        const to = from + options.itemsPerPage;
        const result: PagedResults = _.assign(options, {
            total: items.length,
            filters,
            items: items.slice(from, to)
        });
        res.send(result);
    });
};
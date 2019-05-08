import * as _ from 'lodash';
import {Recipe, PagedResults} from '../../../common/models';
import { MongoDBService } from '../services/MongoDBService';
import DBService from '../services/AbstractDBService';

// Middleware to catch all failing requests.
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const dbService: DBService = MongoDBService.getInstance();

export default function recipeRoutes(app, db) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });

    app.get('/api/recipes', asyncMiddleware(async (req, res, next) => {
        // TODO id issue with new recipes
        // TODO unit tests
        // TODO try out GraphQL?
        let {options, filters} = req.query;
        options = JSON.parse(options);
        filters = JSON.parse(filters);
        const items: Array<Recipe> = await dbService.findRecipes(filters);
        const from = options.page*options.itemsPerPage;
        const to = from + options.itemsPerPage;
        const result: PagedResults = _.assign(options, {
            total: items.length,
            filters,
            items: items.slice(from, to)
        });
        res.send(result);
    }));

    app.get('/api/recipe', asyncMiddleware(async (req, res, next) => {
        const recipe = await dbService.findRecipeById(req.query.id);
        res.send(recipe);
    }));

    app.post('/api/recipe', asyncMiddleware(async (req, res, next) => {
        const recipe = await dbService.insertRecipe(req.body);
        res.send(recipe.id);
    }));

    app.put('/api/recipe', asyncMiddleware(async (req, res, next) => {
        const recipe = await dbService.updateRecipe(req.body);
        res.send(recipe);
    }));

    app.delete('/api/recipe', asyncMiddleware(async (req, res, next) => {
        const id = req.query.id;
        await dbService.removeRecipe(id);
        res.send(id);
    }));
};
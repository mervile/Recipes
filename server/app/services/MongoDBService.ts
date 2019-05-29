import DBService from './AbstractDBService';
import {MongoClient, Collection, ObjectId} from 'mongodb';
import { Recipe, RecipeFiltersInterface } from '../../../common/models';
import * as _ from 'lodash';

export class MongoDBService extends DBService {

    private static instance: MongoDBService;

    // DB name
    private name: string;

    // MongoDB client
    private client: MongoClient;

    // Recipes collection
    private collection: Collection;

    private constructor() {
        super();

        this.name = 'myrecipes';

        this.client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017', { useNewUrlParser: true });
    }

    static getInstance(): MongoDBService {
        if (!MongoDBService.instance) {
            MongoDBService.instance = new MongoDBService();
        }

        return MongoDBService.instance;
    }

    async connect() {
        console.log('Is client connected?', this.client.isConnected());
        if (!this.client.isConnected()) {
            console.log('Connecting to mongoDB...')
            try {
                await this.client.connect();  
                const db = this.client.db();
                this.collection = db.collection('recipes');
                // Create text index for search by text
                this.collection.createIndex({ name: "text", instructions: "text"} )
                console.log('Database connection up');
            } catch (error) {
                console.error('Error connecting to mongoDB:', error);
            }
        }
    }

    async close() {
        if (this.client.isConnected()) {
            try {
                await this.client.close();
                console.log('Database connection closed');
            } catch (error) {
                console.error('Error closing mongoDB connection:', error);
            }
        }
    }

    async findRecipes(filters: RecipeFiltersInterface): Promise<Array<Recipe>> {
        try {
            const withoutSearchText = ({searchText, ...rest}) => rest;
            const query = _.pickBy({...withoutSearchText(filters)}, (value) => !_.isNil(value) && value !== '');
            if (filters.searchText) {
                query.$text = {$search: filters.searchText};
            }
            console.log('Recipe query:', query);
            const recipes = await this.collection.find(query).toArray();
            console.log('Found recipes:', recipes);
            return recipes;
        } catch (error) {
            console.error('Error getting recipes:', error);
        }
    }

    async findRecipeById(id: string): Promise<Recipe> {
        try {
            console.log('Find recipe by id:', id);
            const recipe = await this.collection.findOne({id});
            console.log('Found recipe:', recipe);
            return recipe;
        } catch (error) {
            console.error('Error getting recipe:', error);
        }
    }

    async insertRecipe(newRecipe: Recipe): Promise<Recipe> {
        try {
            const excludeFields = ({id, datetime, ...rest}) => rest;
            const id = new ObjectId();
            const item = {...excludeFields(newRecipe), id: id.toHexString(), _id: id, datetime: Date.now()};
            console.log('Insert recipe:', item);
            const result = await this.collection.insertOne(item);
            console.log('Insert result:', result);
            const recipe: Recipe = _.first(result.ops);
            return recipe;
        } catch (error) {
            console.error('Error inserting recipe:', error);
        }
    }

    async updateRecipe(item: Recipe): Promise<Recipe> {
        try {
            console.log('Update recipe:', item);
            delete item._id;
            const result = await this.collection.updateOne({id: item.id}, {$set: {...item}});
            console.log('Update result:', result);
            return item;
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    }

    async removeRecipe(id: string) {
        try {
            console.log('Remove recipe by id:', id);
            const result = await this.collection.deleteOne({id});
            console.log('Remove result:', result);
            return id;
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    }
}

import recipeRoutes from './recipe_routes';
module.exports = function(app, db) {
  recipeRoutes(app, db);
  // Other route groups could go here, in the future
};
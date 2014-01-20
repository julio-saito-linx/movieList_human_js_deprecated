/*global app, me, $*/
var Backbone = require('backbone');
var MoviesPage = require('./pages/movies');
var MoviesTablePage = require('./pages/moviesTable');
var InfoPage = require('./pages/info');


module.exports = Backbone.Router.extend({
    routes: {
        '': 'movies',
        'movies': 'movies',
        'moviesTable': 'moviesTable',
        'movies/:query': 'movies',
        'info': 'info'
    },

    // ------- ROUTE HANDLERS ---------
    movies: function (query) {
        app.renderPage(new MoviesPage({
            model: me,
            collection: app.movies,
            query: query
        }));
    },

    moviesTable: function (query) {
        app.renderPage(new MoviesTablePage({
            model: me,
            collection: app.movies,
            query: query
        }));
    },

    info: function () {
        app.renderPage(new InfoPage({
            model: me
        }));
    }
});

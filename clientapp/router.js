/*global app, me, $*/
var Backbone = require('backbone');
var Movies = require('./pages/movies');
var InfoPage = require('./pages/info');


module.exports = Backbone.Router.extend({
    routes: {
        '': 'movies',
        'movies': 'movies',
        'movies/:query': 'movies',
        'info': 'info'
    },

    // ------- ROUTE HANDLERS ---------
    movies: function (query) {
        app.renderPage(new Movies({
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

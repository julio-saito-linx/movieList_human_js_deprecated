/*global app, me, $*/
var Backbone = require('backbone');
var HomePage = require('./pages/home');
var CollectionDemo = require('./pages/collectionDemo');
var Movies = require('./pages/movies');
var InfoPage = require('./pages/info');


module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'movies': 'movies',
        'collections': 'collectionDemo',
        'info': 'info'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.renderPage(new HomePage({
            model: me
        }));
    },

    collectionDemo: function () {
        app.renderPage(new CollectionDemo({
            model: me,
            collection: app.people
        }));
    },

    movies: function () {
        app.renderPage(new Movies({
            model: me,
            collection: app.movies
        }));
    },

    info: function () {
        app.renderPage(new InfoPage({
            model: me
        }));
    }
});

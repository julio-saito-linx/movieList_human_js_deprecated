'use strict';
var PageView = require('./base');
var templates = require('../templates');
var MovieView = require('../views/movie');


module.exports = PageView.extend({
    title: 'movies',
    template: templates.pages.movies,
    events: {
        'keyup .q': 'processKeys',
    //     'click .fetch': 'fetchCollection',
    //     'click .reset': 'resetCollection',
    //     'click .add': 'addRandom'
    },
    render: function (myQuery) {
        this.renderAndBind();
        this.renderCollection(this.collection, MovieView, this.$('.movie')[0]);
        if (!this.collection.length || myQuery) {
            this.fetchCollection(myQuery);
        }
    },
    fetchCollection: function (myQuery) {
        var querySearch = myQuery || this.options.query;
        this.collection.fetch({ data: $.param({ query: querySearch}) });
        return false;
    },
    processKeys : function (e) {
        //console.log('key:', e.which)
        if (e.which === 13) {
            var t = $(e.target);
            app.router.navigate('movies/' + t.val());
            this.render(t.val());
        }
    }
});

'use strict';
var PageView = require('./base');
var templates = require('../templates');
var MovieTableView = require('../views/movieTable');

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

        //get .q
        this.jSearch = this.jSearch || this.$('.q');

        this.renderCollection(this.collection, MovieTableView, this.$('.movie')[0]);
        if (!this.collection.length || myQuery) {
            this.fetchCollection(myQuery);
        }
    },
    updateSearchField : function (query) {
        this.jSearch.val(query);
    },
    fetchCollection: function (myQuery) {
        var querySearch = myQuery || this.options.query;
        this.collection.fetch({ data: $.param({ query: querySearch}) });
        
        this.updateSearchField(querySearch);
        
        return false;
    },
    processKeys : function (e) {
        //console.log('key:', e.which)
        if (e.which === 13) {
            var t = $(e.target);
            app.router.navigate('moviesTable/' + t.val());
            this.render(t.val());
        }
    }
});

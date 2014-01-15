var PageView = require('./base');
var templates = require('../templates');
var MovieView = require('../views/movie');


module.exports = PageView.extend({
    title: 'movies',
    template: templates.pages.movies,
    // events: {
    //     'click .shuffle': 'shuffle',
    //     'click .fetch': 'fetchCollection',
    //     'click .reset': 'resetCollection',
    //     'click .add': 'addRandom'
    // },
    render: function () {
        this.renderAndBind();
        this.renderCollection(this.collection, MovieView, this.$('.movie')[0]);
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    }
});

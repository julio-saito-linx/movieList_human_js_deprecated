'use strict';

var PageView = require('./base');
var templates = require('../templates');
var MovieView = require('../views/movie');


module.exports = PageView.extend({
    title: 'movieDetail',
    template: templates.pages.movie,
    events: {
    //     'click .fetch': 'fetchModel',
    //     'click .reset': 'resetModel',
    //     'click .add': 'addRandom'
    },
    render: function () {
        this.renderAndBind();
    },
    fetchModel: function () {
        this.model.fetch();
        return false;
    }
});

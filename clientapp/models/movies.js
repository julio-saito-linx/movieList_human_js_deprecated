var Backbone = require('backbone');
var Movie = require('./movie');


module.exports = Backbone.Collection.extend({
    model: Movie,
    url: '/api/movies'
});

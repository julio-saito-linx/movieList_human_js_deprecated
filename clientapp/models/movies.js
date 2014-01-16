var Backbone = require('backbone');
var Movie = require('./movie');


module.exports = Backbone.Collection.extend({
    model: Movie,
    url: '/api/movies'

    // , initialize : function(models, options){
    //     this.query = options.query;
    // }
    // , url: function(){
    //     return "http://localhost:9200/movies/movies/_search?q="+this.query;
    // }
});

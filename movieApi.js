;(function() {

  var elasticsearch = require('elasticsearch');
  var Emitter = require('wildemitter');
  var q = require('q');

  var MovieApi = function(){
    Emitter.call(this);
  };

  // Inherit from emitter, but retain constructor
  MovieApi.prototype = Object.create(Emitter.prototype, {
    constructor:{
      value: MovieApi
    }
  });



  var client = new elasticsearch.Client({
      host: 'localhost:9200'
    //, log: 'trace'
  });


  // function promisify(nodeAsyncFn, context) {
  //   return function() {
  //     var defer = q.defer()
  //       , args = Array.prototype.slice.call(arguments);

  //     args.push(function(err, val) {
  //       if (err !== null) {
  //         return defer.reject(err);
  //       }

  //       return defer.resolve(val);
  //     });

  //     nodeAsyncFn.apply(context || {}, args);

  //     return defer.promise;
  //   };
  // };

  var searchQuery = function(query) {
    var defer = q.defer();

    console.log(query);
    client.search({
      index: 'movies',
      type: 'movie',
      body: {
        query: {
           query_string: {
             query: query
           }
        }
      }
    }, function (error, response) {
      if (error) {
        // handle error
        console.log("ERROR:", error);
        return defer.reject(error);
      }
      
      //console.log("query:", query, "found", response.hits.hits.length);

      var results = [];
      for (var i = 0; i < response.hits.hits.length; i++) {
        var hit = response.hits.hits[i];
        var source = hit._source;

        //switch ID x idImdb
        source.idImdb = source.id;
        source.id = parseInt(hit._id, 10);

        source.year = source.year[0];
        source.title = source.title[0];

        source.originaltitle = source.originaltitle[0];
        source.tagline = source.tagline[0];
        source.basepath = source.basepath[0];
        source.country = source.country[0];
        source.idImdb = source.idImdb[0];

        if(source.thumb.length > 0){
          source.firstThumb = source.thumb[0].prevThumb;
          source.fullImage = source.thumb[0].longThumb;
        }

        results.push(source);
      };

      //console.log("results:", results.length);
      return defer.resolve(results);
    });

    return defer.promise;
  };


  MovieApi.prototype.getWar = function (req, res) {
      searchQuery("War").then(function(results) {
        res.send(results);
      });
  };

  // MovieApi.prototype.getWar = function (req, res) {
  //   // res.send([{"title": ["Tora! Tora! Tora!"]}]);
  //   res.send([{"title": "Tora! Tora! Tora!"}]);
  // };

  // function(req, res) {
  //   User.find(req.params.userId).then(function(user) {
  //       Project.getMemo(req.params.userId).then(function(memo) {
  //           res.json({
  //               user: user,
  //               memo: memo
  //           });
  //       });
  //   });

  module.exports = MovieApi;

})();
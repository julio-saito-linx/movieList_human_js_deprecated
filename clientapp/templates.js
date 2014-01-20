(function () {
var root = this, exports = {};

// The jade runtime:
var jade = exports.jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});


// create our folder objects
exports["includes"] = {};
exports["pages"] = {};

// body.jade compiled template
exports["body"] = function tmpl_body(locals) {
    var buf = [];
    buf.push('<body><div class="container"><div class="navbar"><div class="navbar-inner"><a href="#" class="brand">My movie list</a><ul class="nav"><li><a href="/movies">Movies</a></li><li><a href="/moviesTable">Movies Table</a></li><li><a href="/info">human javascript</a></li></ul></div></div><main id="pages"></main></div></body>');
    return buf.join('');
};

// head.jade compiled template
exports["head"] = function tmpl_head(locals) {
    var buf = [];
    buf.push('<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>');
    return buf.join('');
};

// includes/movie.jade compiled template
exports["includes"]["movie"] = function tmpl_includes_movie(locals) {
    var buf = [];
    buf.push('<tr class="movie"><td class="tableImage"><a class="fullImage"><img class="firstThumb"/></a><span class="imdbRating"></span></td><td><table class="table"><tr><td><span class="span1">Title:</span><span class="title span3"></span><span class="span1">Year:</span><span class="year span1"> </span><a class="hrefImdb spanInfo"></a></td></tr><tr><td><span class="span1">Original:</span><span class="originaltitle span3"></span><span class="country span3"></span></td></tr><tr><td><span class="span1">Director:</span><span class="director span8"></span></td><tr></tr><td colspan="3"><span class="tagline span8"></span></td></tr><tr><td colspan="3"><span class="basepath span8"></span></td></tr></table></td></tr>');
    return buf.join('');
};

// includes/movieTable.jade compiled template
exports["includes"]["movieTable"] = function tmpl_includes_movieTable(locals) {
    var buf = [];
    buf.push('<tr class="movie"><td><span class="title"></span></td><td><span class="imdbRating"></span></td><td><span class="year"> </span></td><td><span class="director"></span></td></tr>');
    return buf.join('');
};

// pages/info.jade compiled template
exports["pages"]["info"] = function tmpl_pages_info(locals) {
    var buf = [];
    buf.push('<section class="page pageTwo"><h2>More Info</h2><p>This is a demo app by <a href="http://twitter.com">Henrik Joreteg</a>.</p><h4>Relevant links:</h4><ul><li> <a href="http://humanjavascript.com">human javascript</a> &mdash; the book</li><li> <a href="https://github.com/HenrikJoreteg/humanjs-sample-app">github repo </a> &mdash; for this app</li><li> <a href="http://andyet.com">&yet</a> &mdash; The company behind this effort.</li></ul><h4>Finding Packages</h4><ul><li><a href="http://projects.joreteg.com/humanjs-resources/">humanjs resources</a> &mdash; A few curated modules with a quick search</li><li><a href="https://github.com/component">Component </a> &mdash; Lots of tools here in tiny modules. Most are on npm as {{name}}-component</li><li><a href="http://browserify.org/search">Browserify module search</a> &mdash; Searches npm for browserify packages</li></ul><h4>Apps Built this way</h4><ul><li> <a href="http://andbang.com">And Bang</a> &mdash; Team same-pagification tool. Realtime chat + task management</li><li> <a href="http://talky.io">Talky </a> &mdash; Free, zero-setup, no-account, peer-to-peer encrypted video calls</li></ul></section>');
    return buf.join('');
};

// pages/movie.jade compiled template
exports["pages"]["movie"] = function tmpl_pages_movie(locals) {
    var buf = [];
    buf.push('<section class="page pageOne"><h2>Movie</h2><div class="movieDetail"></div></section>');
    return buf.join('');
};

// pages/movies.jade compiled template
exports["pages"]["movies"] = function tmpl_pages_movies(locals) {
    var buf = [];
    buf.push('<section class="page pageOne"><h2>Movies</h2><div class="searchDiv"><p>Search: <input class="q"/></p></div><table class="movie table"></table></section>');
    return buf.join('');
};


// attach to window or export with commonJS
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();
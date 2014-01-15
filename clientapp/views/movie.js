var HumanView = require('human-view');
var templates = require('../templates');


module.exports = HumanView.extend({
    template: templates.includes.movie,
    textBindings: {
            year: '.year'
        ,   title: '.title'
        ,   originaltitle: '.originaltitle'
        ,   tagline: '.tagline'
        ,   basepath: '.basepath'
        ,   country: '.country'
        ,   idImdb: '.hrefImdb'


    },
    srcBindings: {
        'firstThumb': '.firstThumb'
    },
    hrefBindings: {
        'fullImage': '.fullImage',
        'hrefImdb': '.hrefImdb'
    },
    // events: {
    //     'click .delete': 'handleRemoveClick'
    // },
    render: function () {
        this.renderAndBind();
    },
    handleRemoveClick: function () {
        this.model.destroy();
    }
});

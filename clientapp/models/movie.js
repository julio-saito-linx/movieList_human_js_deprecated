var HumanModel = require('human-model');


module.exports = HumanModel.define({
    props: {
        id: 'number'
      , title: ['string', true, '']
      , year: ['string', false, '']
      , firstThumb: ['string', false, '#']
      , fullImage: ['string', false, '#']
      , originaltitle: ['string', false, '']
      , tagline: ['string', false, '']
      , basepath: ['string', false, '']
      , country: ['string', false, '']
      , idImdb: ['string', false, '']

    },
    // session: {
    //     selected: ['boolean', true, false]
    // },
    derived: {
      hrefImdb: {
        deps: ['idImdb'],
        fn: function () {
            return "http://www.imdb.com/title/" + this.idImdb + "/";
        }
      }
    }
});

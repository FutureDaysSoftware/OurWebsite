const Toast = require('@futuredays/toast')

module.exports = Object.create( {

    constructor() {
        this.range = document.createRange();
        this.range.selectNode(document.getElementsByTagName("div").item(0))
        this.Toast = new Toast( { range: this.range } )
        return this
    },

    create( name, opts ) {
        const lower = name
        name = ( name.charAt(0).toUpperCase() + name.slice(1) ).replace( '-', '' )

        return new this.Views[ name ](
            {
                Toast: this.Toast,
                name,
                factory: this,
                range: this.range,
                template: this.Templates[ name ],
                model: this.Models[ name ] ? Object.create( this.Models[ name ] ) : undefined,
                user: this.User,
                ...opts
            }
        )
    },

}, {
    Models: { value: require('../.ModelMap') },
    Templates: { value: require('../.TemplateMap') },
    User: { value: require('../models/User') },
    Views: { value: require('../.ViewMap') }
} )

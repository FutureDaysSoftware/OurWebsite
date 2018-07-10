const View = require('@futuredays/view')

module.exports = class Header extends View {

    constructor( opts ={} ) {
        super()
        return this.initialize( opts )
    }

    events = { navList: 'click' }

    insertion() { return { el: document.querySelector('#content'), method: 'insertBefore' } }

    onNavListClick(e) {
        const target = e.target
        if( target.tagName !== 'SPAN' ) return
            
        this.emit( 'navigate', `/${target.textContent.toLowerCase()}` )
    }

}

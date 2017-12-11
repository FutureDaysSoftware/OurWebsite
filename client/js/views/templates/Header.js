module.exports = function( { model } ) {
const navOptions = model.map( datum => `<span>${this.CapitalizeFirstLetter(datum)}</span>` ).join('')
return `<nav>
    <div>
        <div class="top-name">
            <span>Future</span>
            <span>Days</span>
        </div>
        <div>Software</div>
    </div>
    <div data-js="navList">${navOptions}</div>
</nav>
`
}

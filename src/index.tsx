///<reference path="../References.d.ts" />
import React = require('react')
import ReactDOM = require('react-dom')
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Element, elementStore} from './model'
import _ = require('lodash')

// Ridiculous way to create keys.
// Thanks to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105078#105078
function generateGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if(j == 8 || j == 12|| j == 16|| j == 20) 
            result = result + '-'
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase()
        result = result + i
    }
    return result
}


const App = observer((props) => {
    const rootElement = elementStore.root
    console.log(toJS(rootElement.children))

    return (
        <div>
            <div>
                <button onClick={() => rootElement.add(new Element())}>
                    Add children
                </button>
            </div>
            <List elements={rootElement.children} />
        </div>
    )
})

const Item = observer((props) => {
    let element = props.element
   
    return (
        <div className="checklist">
            <div className="header">
                <input type="checkbox" checked={element.checked} onChange={(v) => { element.checked = v.target.checked}}/>
                <input type="text" value={element.name} onChange={(v) => { element.name = v }} />
                <button onClick={ () => element.remove()}>
                    Delete
                </button>
                <button onClick={() => element.add(new Element())}>
                    Add children
                </button>
            </div>
            <List elements={element.children} />
        </div>
    )
})

const List = (props => {
    // console.log(_.map(elements, item => item))

    return (
        <div className='children'>
            {_.map(props.elements, item => <Item key={generateGuid()} element={item} />)}
        </div>
    )
})

ReactDOM.render( <App />, document.getElementById('app-mount-root'))
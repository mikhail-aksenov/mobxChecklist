///<reference path="../References.d.ts" />
import React = require('react')
import ReactDOM = require('react-dom')
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Element, elementStore} from './model'
import _ = require('lodash')
import DevTools from 'mobx-react-devtools'
import uuid = require('uuid')

const App = observer((props) => {
    const rootElement = elementStore.root
    console.log(toJS(rootElement.children))

    return (
        <div>
            <DevTools />
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
                <input type="text" value={element.name} onChange={(v) => { element.name = v.target.value }} />
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
            {_.map(props.elements, item => <Item key={uuid.v4()} element={item} />)}
        </div>
    )
})

ReactDOM.render( <App />, document.getElementById('app-mount-root'))
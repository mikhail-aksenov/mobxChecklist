///<reference path="../References.d.ts" />
import {observable, autorun, transaction, computed, action, reaction} from 'mobx'
import _ = require('lodash')

export class ElementStore {
    @observable root: Element = new Element()
}

export class Element {
    name: string

    @observable checked: boolean = true
    @observable children: Element[] = []
    @observable parent: Element

    constructor() {
        // Set reaction for checked property
        reaction(() => this.checked, checked => {
            transaction(() => {
                if (this.isChecked != checked)
                    for (let c of this.children)
                        c.checked = checked
            })
        })

        // Set reaction for checked property of every children
        reaction(() => this.children.map(f => f.checked), childrenChecked => {
            if (this.children.length)
                this.checked = this.isChecked
        })
    }
    
    @computed get isChecked() {
        return this.children.every(f => f.checked)
    }

    @action remove() {
        if (this.parent.children.length != 0)
            _.remove(this.parent.children, this)
    }

    @action add(e: Element) {
        e.parent = this
        this.children.push(e)
    }
}

export const elementStore = new ElementStore()
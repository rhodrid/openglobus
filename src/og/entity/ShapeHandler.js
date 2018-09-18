/**
 * @module og/entity/ShapeHandler
 */

'use strict';

import * as shaders from '../shaders/shape.js';

class ShapeHandler {
    constructor(entityCollection) {

        /**
         * Picking rendering option.
         * @public
         * @type {boolean}
         */
        this.pickingEnabled = true;

        this._entityCollection = entityCollection;

        this._renderer = null;

        this._shapes = [];

        this.__staticId = ShapeHandler._staticCounter++;
    }

    static get _staticCounter() {
        if (!this._counter && this._counter !== 0) {
            this._counter = 0;
        }
        return this._counter;
    }

    static set _staticCounter(n) {
        this._counter = n;
    }

    _initProgram() {
        if (this._renderer.handler) {
            if (!this._renderer.handler.Programs.shape_nl) {
                this._renderer.handler.addProgram(shaders.shape_nl());
            }
            if (!this._renderer.handler.Programs.shape_wl) {
                this._renderer.handler.addProgram(shaders.shape_wl());
            }
            //if (!this._renderer.handler.Programs.shapePicking) {
            //    this._renderer.handler.addProgram(shaders.shapePicking());
            //}
        }
    }

    setRenderNode(renderNode) {
        this._renderer = renderNode.renderer;
        this._initProgram()
        for (var i = 0; i < this._shapes.length; i++) {
            this._shapes[i].setRenderNode(renderNode);
        }
    }

    add(shape) {
        if (shape._handlerIndex == -1) {
            shape._handler = this;
            shape._handlerIndex = this._shapes.length;
            this._shapes.push(shape);
            this._entityCollection && this._entityCollection.renderNode && shape.setRenderNode(this._entityCollection.renderNode);
        }
    }

    remove(shape) {
        //TODO
    }

    draw() {
        var i = this._shapes.length;
        while (i--) {
            this._shapes[i].draw();
        }
    }

    drawPicking() {
        //TODO
    }

    clear() {
        //TODO
    }
};

export { ShapeHandler };
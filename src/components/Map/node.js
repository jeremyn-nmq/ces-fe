import React, { Component } from 'react'
import { NodeStyled } from './styles'

export class Node extends Component {
    render() {
        const { node, chooseNode } = this.props;
        const { CityCodeName, x, y, isStart = false, isDestination = false } = node;
        return (
            <NodeStyled id={CityCodeName} x={x} y={y} isStart={isStart} isDestination={isDestination} onClick={() => { chooseNode(CityCodeName) }} />
        );
    }
}

export default Node;

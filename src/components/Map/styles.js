import styled from 'styled-components'

export const NodeStyled = styled.div`
    cursor: pointer;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    position: absolute;
    top: ${props => props.x + 'px'};
    left: ${props => props.y + 'px'};
    border: 2px solid;
    background: ${props => props.isStart ? 'green' : props.isDestination ? 'blue' : 'red' };
`;

export const MapContainerStyled = styled.div`
    position: relative;
`;
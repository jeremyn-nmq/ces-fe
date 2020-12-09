import React, { Component } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Button } from 'antd';
import Node from '../Map/node';
import map from '../Map/map.jpg';
import { MapContainerStyled } from '../Map/styles';
import { connect } from 'react-redux';
import { getCites } from '../../reducers';

const nodes = [
    {
        x: 65,
        y: 119,
        CityCodeName: "tanger"
    },
    {
        x: 181,
        y: 29,
        CityCodeName: "dakar"
    },
    {
        x: 242,
        y: 41,
        CityCodeName: "sierraleone"
    },
    {
        x: 86,
        y: 53,
        CityCodeName: "dekanariskeoer"
    },
    {
        x: 109,
        y: 86,
        CityCodeName: "Marrakesh"
    },
    {
        x: 193,
        y: 127,
        CityCodeName: "timbuktu"
    },
    {
        x: 269,
        y: 105,
        CityCodeName: "guldkysten"
    },
    {
        x: 383,
        y: 58,
        CityCodeName: "sthelena"
    },
    {
        x: 268,
        y: 174,
        CityCodeName: "slavekysten"
    },
    {
        x: 202,
        y: 218,
        CityCodeName: "wadai"
    },
    {
        x: 100,
        y: 225,
        CityCodeName: "tripoli"
    },
    {
        x: 66,
        y: 198,
        CityCodeName: "tunis"
    },
    {
        x: 140,
        y: 154,
        CityCodeName: "sahara"
    },
    {
        x: 311,
        y: 237,
        CityCodeName: "congo"
    },
    {
        x: 359,
        y: 226,
        CityCodeName: "luanda"
    },
    {
        x: 442,
        y: 238,
        CityCodeName: "hvalbugten"
    },
    {
        x: 507,
        y: 271,
        CityCodeName: "kapstaden"
    },
    {
        x: 230,
        y: 270,
        CityCodeName: "darfur"
    },
    {
        x: 164,
        y: 296,
        CityCodeName: "omdurman"
    },
    {
        x: 263,
        y: 304,
        CityCodeName: "bahrelghazal"
    },
    {
        x: 324,
        y: 297,
        CityCodeName: "kabalo"
    },
    {
        x: 277,
        y: 340,
        CityCodeName: "victoriasoen"
    },
    {
        x: 178,
        y: 366,
        CityCodeName: "suakin"
    },
    {
        x: 229,
        y: 396,
        CityCodeName: "addisabeba"
    },
    {
        x: 412,
        y: 318,
        CityCodeName: "victoriafaldene"
    },
    {
        x: 445,
        y: 346,
        CityCodeName: "dragebjerget"
    },
    {
        x: 388,
        y: 390,
        CityCodeName: "mocambique"
    },
    {
        x: 447,
        y: 418,
        CityCodeName: "kapstmarie"
    },
    {
        x: 397,
        y: 447,
        CityCodeName: "tamatave"
    },
    {
        x: 218,
        y: 450,
        CityCodeName: "kapguardafui"
    },
    {
        x: 304,
        y: 395,
        CityCodeName: "zanzibar"
    },
    {
        x: 81,
        y: 319,
        CityCodeName: "cairo"
    }
];

export class index extends Component {
    state = {
        visible: false,
        startNode: null,
        destinationNode: null,
    };

    chooseNode = (code) => {
        const { startNode, destinationNode } = this.state;
        this.setState({
            startNode: startNode == null ? code : startNode,
            destinationNode: startNode != null ? code : null,
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        const { onSubmit } = this.props;
        const { startNode, destinationNode } = this.state;
        this.setState({
            visible: false,
            startNode: null,
            destinationNode: null,
        });
        onSubmit(startNode, destinationNode)
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            startNode: null,
            destinationNode: null,
        });
    };

    render() {
        const { cities } = this.props;
        const { startNode, destinationNode } = this.state;
        const nodesInfo = nodes.map(node => {
            return { ...node, isStart: node.CityCodeName == startNode, isDestination: node.CityCodeName == destinationNode }
        })
        let label = "No City Selected"
        if (startNode != null && destinationNode != null) {
            const start = cities.find(element => element.CityCodeName == startNode)
            const des = cities.find(element => element.CityCodeName == destinationNode)
            label = "Confirm from: " + start.CityLabel + " - to: " + des.CityLabel
        } else {
            label = "No" + (startNode == null ? " From" : " Destination") + " City Selected"
        }

        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Select From Map
                </Button>
                <Modal
                    width="620px"
                    style={{ top: '0' }}
                    title="Select Location from map"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{ disabled: startNode == null || destinationNode == null }}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button disabled={startNode == null || destinationNode == null} type="primary" onClick={this.handleOk}>
                            {label}
                        </Button>,
                    ]}
                >
                    <div style={{ display: "flex", marginLeft: "31px" }}>
                        <MapContainerStyled>
                            <img src={map} alt="Logo" style={{ width: '500px' }} />
                            {nodesInfo.map((node) => (
                                <Node chooseNode={this.chooseNode} node={node} />
                            ))}
                        </MapContainerStyled>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = store => ({
    cities: getCites(store)
})

export default connect(mapStateToProps)(index);
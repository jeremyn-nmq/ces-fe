import React, { Component } from 'react';
import './ConfigInfo.css';
import { Layout, Menu, Breadcrumb, Form, Input, Button, Row, Col } from 'antd';
import { SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png';
import { connect } from 'react-redux';
import { dispatchGetConfigData, dispatchUpdateConfigData, getConfigData } from '../../reducers';

const { Header, Content, Sider } = Layout;

class homePage extends Component {
  componentDidMount = () => {
    const { getConfigData } = this.props;
    getConfigData();
  }

  onSubmit = () => {
    const { state } = this
    const { updateConfigData, configData } = this.props;
    updateConfigData({ ...configData, ...state })
  }

  changeField = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { configData } = this.props;
    const { MaxWeight, PriceNovApr10, PriceNovApr1050, PriceNovApr50, PriceMayOct10, PriceMayOct1050, PriceMayOct50 } = configData;
    if (MaxWeight == null) {
      return (
        <>
          <h3>Configuration, Loading...</h3>
        </>
      )
    }
    return (<>
      <h3>Configuration</h3>
      <Form onFinish={this.onSubmit}>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Maximum weight limit (in kg)"
              rules={[{ required: true, message: 'Please enter the weight limit' }]}
            >
              <Input name="MaxWeight" type="number" defaultValue={MaxWeight} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <h4>Pricing from November to April</h4>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Parcel under 10kg"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input name="PriceNovApr10" type="number" defaultValue={PriceNovApr10} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Parcel from 10kg to 50kg"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input name="PriceNovApr1050" type="number" defaultValue={PriceNovApr1050} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Parcel over 50kg"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input name="PriceNovApr50" type="number" defaultValue={PriceNovApr50} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <h4>Pricing from May to October</h4>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Parcel under 10kg"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input name="PriceMayOct10" type="number" defaultValue={PriceMayOct10} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Parcel from 10kg to 50kg"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input name="PriceMayOct1050" type="number" defaultValue={PriceMayOct1050} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16} className="column-p">
            <Form.Item
              label="Parcel over 50kg"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input name="PriceMayOct50" type="number" defaultValue={PriceMayOct50} onChange={this.changeField} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>)
  }
}

Sider.propTypes = {};

Sider.defaultProps = {};

const mapStateToProps = store => ({
  configData: getConfigData(store)
})

const mapDispatchToProps = ({
  getConfigData: dispatchGetConfigData,
  updateConfigData: dispatchUpdateConfigData,
})

export default connect(mapStateToProps, mapDispatchToProps)(homePage);

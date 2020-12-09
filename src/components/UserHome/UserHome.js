import React, {Component} from 'react';
import './UserHome.css';
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Table,
  Switch,
  Space,
  Row,
  Col,
  InputNumber,
} from 'antd';
import MapModal from '../MapModal';
import {connect} from 'react-redux';
import {
  dispatchLoadCites,
  getCites,
  dispatchSearchRoutes,
  getRoutes,
  dispatchCreateShipping,
} from '../../reducers';

const {Sider, Content} = Layout;

const columns = [
  {
    title: 'Route',
    dataIndex: 'route',
    key: 'rout',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Duration (hours)',
    dataIndex: 'Duration',
    key: 'Duration',
  },
  {
    title: 'Price',
    dataIndex: 'Price',
    key: 'Price',
    render: (text) => '$' + text,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Choose {record.route}</a>
      </Space>
    ),
  },
];

class homePage extends Component {
  state = {
    from: null,
    to: null,

    weight: 0,
    type: null,
    height: 0,
    breadth: 0,
    depth: 0,

    filter: 'price',
  };

  componentDidMount = () => {
    const {loadCities} = this.props;
    loadCities();
  };

  changeFilter = () => {
    const {filter} = this.state;

    this.setState({
      filter: filter == 'price' ? 'duration' : 'price',
    });
  };

  changeFromAndTo = (from, to) => {
    console.log(from, to);
    this.setState({
      from,
      to,
    });
  };

  changeFrom = (from) => {
    this.setState({
      from,
    });
  };

  changeTo = (to) => {
    this.setState({
      to,
    });
  };

  changeField = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  changeType = (type) => {
    this.setState({
      type,
    });
  };

  searchRoute = (e) => {
    const {searchRoute} = this.props;
    const {from, to, weight, type, height, breadth, depth} = this.state;
    searchRoute({
      from,
      to,
      weight,
      type,
      height,
      breadth,
      depth,
    });
  };

  render() {
    const {cities, routes} = this.props;
    const {from, to, weight, type, height, breadth, depth, filter} = this.state;
    const options = cities.map(({CityLabel, CityCodeName}) => (
      <Select.Option value={CityCodeName}>{CityLabel}</Select.Option>
    ));

    routes.sort((a, b) => {
      return filter == 'price' ? a.Price - b.Price : a.Duration - b.Duration;
    });

    const mappedRoutes = routes.map(({Price, Duration}, index) => ({
      key: index,
      route: 'Route ' + index,
      Price,
      Duration,
    }));

    return (
      <>
        <h3>Find routes</h3>
        <Form onFinish={this.searchRoute}>
          <h4>Location and Date</h4>
          <Row>
            <Col span={8} className="column-p">
              <Form.Item
                label="From"
                rules={[{required: true, message: 'Please select a location'}]}
              >
                <Select
                  placeholder="Please select a location"
                  onChange={this.changeFrom}
                  value={from}
                >
                  {options}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className="column-p">
              <Form.Item
                label="To"
                rules={[{required: true, message: 'Please select a location'}]}
              >
                <Select
                  placeholder="Please select a location"
                  onChange={this.changeTo}
                  value={to}
                >
                  {options}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className="column-p">
              <MapModal onSubmit={this.changeFromAndTo} />
            </Col>
          </Row>
          <h4>Parcel information</h4>
          <Row>
            <Col span={8} className="column-p">
              <Form.Item label="Weight (in kg)" required>
                <Input
                  type="number"
                  placeholder="1"
                  name="weight"
                  min="1"
                  value={weight}
                  onChange={this.changeField}
                />
              </Form.Item>
            </Col>
            <Col span={8} className="column-p">
              <Form.Item label="Type" labelAlign="left" required>
                <Select
                  placeholder="Please select a parcel type"
                  defaultValue="normal"
                  value={type}
                  onChange={this.changeType}
                >
                  <Select.Option value="normal">Normal</Select.Option>
                  <Select.Option value="recordeddelivery">
                    Recorded Delivery
                  </Select.Option>
                  <Select.Option value="weapons">Weapons</Select.Option>
                  <Select.Option value="liveanimals">
                    Live animals
                  </Select.Option>
                  <Select.Option value="cautiousparcels">
                    Cautious parcels
                  </Select.Option>
                  <Select.Option value="refrigeratedgoods">
                    Refrigerated goods
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="column-p">
              <Form.Item label="Height (in cm)" required>
                <Input
                  type="number"
                  placeholder="1"
                  name="height"
                  min="1"
                  onChange={this.changeField}
                  value={height}
                />
              </Form.Item>
            </Col>
            <Col span={8} className="column-p">
              <Form.Item label="Breadth (in cm)" required>
                <Input
                  type="number"
                  placeholder="1"
                  name="breadth"
                  min="1"
                  onChange={this.changeField}
                  value={breadth}
                />
              </Form.Item>
            </Col>
            <Col span={8} className="column-p">
              <Form.Item label="Depth ( in cm)" required>
                <Input
                  type="number"
                  placeholder="1"
                  name="depth"
                  min="1"
                  onChange={this.changeField}
                  value={depth}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="column-p">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{marginTop: '30px'}}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: '10px 0 0 0',
            height: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <h3>Search Results</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <h4
                style={{
                  marginRight: '10px',
                }}
              >
                Switch to sort by duration or price
              </h4>
              <Switch
                checkedChildren="duration"
                unCheckedChildren="price"
                checked={filter == 'duration'}
                onChange={this.changeFilter}
                style={{
                  width: '70px',
                }}
              />
            </div>
          </div>
          <Table columns={columns} dataSource={mappedRoutes} />
        </Content>
      </>
    );
  }
}

Sider.propTypes = {};

Sider.defaultProps = {};

const mapStateToProps = (store) => ({
  cities: getCites(store),
  routes: getRoutes(store),
});

const mapDispatchToProps = {
  loadCities: dispatchLoadCites,
  searchRoute: dispatchSearchRoutes,
  createShipping: dispatchCreateShipping,
};

export default connect(mapStateToProps, mapDispatchToProps)(homePage);

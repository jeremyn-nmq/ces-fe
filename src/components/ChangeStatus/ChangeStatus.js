import React from 'react';
import './ChangeStatus.css';
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Tag,
  Row,
  Col,
  Card,
} from 'antd';

const { Header, Content, Sider } = Layout;

const homePage = () => (
  <>
    <h3>Change Status</h3>
    <Form>
      <h4>Enter route number</h4>
      <Row>
        <Col span={12} className="column-p">
          <Form.Item
            rules={[
              { required: true, message: 'Please enter the route number' },
            ]}
          >
            <Input placeholder="NCVN2020" />
          </Form.Item>
        </Col>
        <Col span={12} className="column-p">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search Route
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
      <Card title="Search Result">
        <Row gutter={16}>
          <Col span={8}>
            <Card size="small" type="inner" title="General Information">
              <h4>
                Order number:{' '}
                <span style={{ color: '#FF0000' }}>NCVN2020</span>
              </h4>
              <h4>
                Duration: <span>3 months</span>
              </h4>
              <h4>
                Transportation:{' '}
                <Tag color={'geekblue'} key={'land'}>
                  {'sea'}
                </Tag>
                <Tag color={'green'} key={'sea'}>
                  {'sea'}
                </Tag>
                <Tag color={'volcano'} key={'land'}>
                  {'land'}
                </Tag>
              </h4>
              <h4>
                Price: <span>320 EUR</span>
              </h4>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" type="inner" title="Parcel Information">
              <h4>
                Parcel Weight: <span>30.0 kg</span>
              </h4>
              <h4>
                Parcel Height: <span>30.0 cm</span>
              </h4>
              <h4>
                Parcel Breadth: <span>30.0 cm</span>
              </h4>
              <h4>
                Parcel Depth: <span>30.0 cm</span>
              </h4>
              <h4>
                Parcel Type: <span>Normal</span>
              </h4>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" type="inner" title="Change Status">
              <Form.Item label="Status">
                <Select placeholder="In Progress" defaultValue="inProgress">
                  <Select.Option value="inProgress">
                    In Progress
                      </Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Update Status
                    </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Card>
    </Content>
  </>
);

export default homePage;

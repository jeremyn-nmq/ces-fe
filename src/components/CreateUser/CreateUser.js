import React from 'react';
import './CreateUser.css';
import {
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Input,
  Button,
  Select,
  Tag,
  Row,
  Col,
  Card,
} from 'antd';
import {SettingOutlined, UserAddOutlined} from '@ant-design/icons';
import logo from '../../images/logo.png';

const {Header, Content, Sider} = Layout;

const homePage = () => (
  <>
    <h3>Create a User</h3>
    <Form>
      <Row>
        <Col span={16} className="column-p">
          <Form.Item
            label="Username"
            rules={[{required: true, message: 'Please enter a username'}]}
          >
            <Input placeholder="example12" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={16} className="column-p">
          <Form.Item
            label="User Password"
            rules={[
              {required: true, message: 'Please enter the user password'},
            ]}
          >
            <Input placeholder="password" defaultValue="password" />
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
  </>
);

Sider.propTypes = {};

Sider.defaultProps = {};

export default homePage;

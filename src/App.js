import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';
import UserHome from './components/UserHome/UserHome';
import ChangeStatus from './components/ChangeStatus/ChangeStatus';
import ConfigInfo from './components/ConfigInfo/ConfigInfo';
import CreateUser from './components/CreateUser/CreateUser';
import 'antd/dist/antd.css';
import './App.css';
import { DashboardOutlined, EditOutlined } from '@ant-design/icons';
import logo from './images/logo.png';
import { Layout, Menu, Button } from 'antd';
import { connect } from 'react-redux';
import { getLoggedIn, dispatchLogout, getAdmin, getIsAdmin, getUsername } from './reducers';
import Login from './pages/login';

const { Header, Content, Sider } = Layout;
class App extends Component {
  render() {
    const { isLoggedIn, loggingOut, isAdmin, username } = this.props;
    if (!isLoggedIn) {
      return <Login />;
    }
    return (
      <Router>
        <Layout>
          <Header className={!isAdmin ? 'header' : 'headerAdmin'}>
            <div className="logo">
              <img src={logo} alt="logo" />
              <Button
                onClick={loggingOut}
                style={{ float: 'right', marginTop: '14px' }}
              >
                Log out
              </Button>
              <span style={{
                float: 'right',
                margin: '-3px 15px',
                color: 'white'
              }}>{username}</span>
            </div>
            <Menu theme="dark" mode="horizontal"></Menu>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              {!isAdmin ? (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item
                    key="sub1"
                    icon={<DashboardOutlined />}
                    title="subnav 1"
                  >
                    <Link to="/users/createShipping">Create Shipping</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="sub2"
                    icon={<EditOutlined />}
                    title="subnav 2"
                  >
                    <Link to="/users/status">Change status</Link>
                  </Menu.Item>
                </Menu>
              ) : (
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                  >
                    <Menu.Item
                      key="sub1"
                      icon={<DashboardOutlined />}
                      title="subnav 1"
                    >
                      <Link to="/admin">Configuration</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="sub2"
                      icon={<EditOutlined />}
                      title="subnav 2"
                    >
                      <Link to="/create">Create User</Link>
                    </Menu.Item>
                  </Menu>
                )}
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  height: 'auto',
                }}
              >
                {!isAdmin ? (
                  <Switch>
                    <Route path="/users/createShipping">
                      <UserHome />
                    </Route>
                    <Route path="/users/status">
                      <ChangeStatus />
                    </Route>
                    <Route path="/">
                      <UserHome />
                    </Route>
                  </Switch>
                ) : (
                    <Switch>
                      <Route path="/admin">
                        <ConfigInfo />
                      </Route>
                      <Route path="/create">
                        <CreateUser />
                      </Route>
                      <Route path="/">
                        <ConfigInfo />
                      </Route>
                    </Switch>
                  )}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export const mapStateToProps = (store) => ({
  isLoggedIn: getLoggedIn(store),
  isAdmin: getIsAdmin(store),
  username: getUsername(store),
});

export const mapDispatchToProp = {
  loggingOut: dispatchLogout,
};

export default connect(mapStateToProps, mapDispatchToProp)(App);

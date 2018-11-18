import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import './Root.scss';
import {Link, Route} from "react-router-dom";
import Dishes from "./Dishes";
import DishForm from "./DishForm";

const {Header, Content, Footer, Sider} = Layout;

const Root = ({match}) => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="default-logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                    <Link to="/dishes">
                        <Icon type="shop"/>
                        <span className="nav-text">Dishes</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{background: '#fff', padding: 0}}/>
            <Content style={{margin: '24px 16px 0'}}>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <Route path={`${match.path}dishes`} component={Dishes}/>
                    <Route path={`${match.path}form`} component={DishForm}/>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    </Layout>
);

export default Root;
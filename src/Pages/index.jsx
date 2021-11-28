import React, {useEffect, useState} from 'react';
import {Route, Routes, NavLink,Outlet} from "react-router-dom"
import {Layout, Menu, Breadcrumb} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import '../static/css/admin.css'


const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default function Index() {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };


  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined/>}>
            工作台
          </Menu.Item>
          <SubMenu key="sub1" icon={<DesktopOutlined/>} title="文章管理">
            <Menu.Item key="addArticle">
              <NavLink to='/Index/add'>添加文章</NavLink>
            </Menu.Item>
            <Menu.Item key="articleList">
              <NavLink to='/Index/list'>文章列表</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined/>}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            <div>
              <Outlet/>
            </div>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>@<a href="">dogetaotao.fun</a></Footer>
      </Layout>
    </Layout>
  )
}

import React, {useEffect, useState} from 'react';
import {Col, Row, List, Breadcrumb} from "antd"
import Link from "next/link"
import {BookTwoTone, CalendarTwoTone, EyeTwoTone} from "@ant-design/icons"
import axios from "axios";
import Introduction from "../components/Introduction"
import Footer from "../components/Footer"
import Header from "../components/Head";
import Label from "../components/Label"
import servicePath from "../config/apiUrl";

const Index = (list) => {

  const [mylist, setMylist] = useState(list.data)

  return (
    <div>
      <title>home</title>
      <Header numberId='0'/>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={14} xl={12}>
          <div className="bread-div">
            {/*<Breadcrumb>*/}
            {/*    <Breadcrumb.Item><a href="#">首页</a></Breadcrumb.Item>*/}
            {/*    /!*<Breadcrumb.Item>React</Breadcrumb.Item>*!/*/}
            {/*</Breadcrumb>*/}
          </div>

          <List header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{pathname: '/details', query: {id: item.id}}}>
                        <span>{item.title}</span>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span><CalendarTwoTone/> {item.time}</span>
                      <span> <BookTwoTone/> {item.typeName}</span>
                      <span> <EyeTwoTone/> {item.view_count}人</span>
                    </div>
                    <div className="list-context">{item.introduce}</div>
                  </List.Item>
                )}
                className="list-home"
          />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={6} lg={5} xl={4}>
          <Introduction/>
          <Label/>
        </Col>
      </Row>
      <Footer/>
    </div>

  )
}

Index.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getArticleList).then(
      (res) => {
        console.log('----->', res.data)
        resolve(res.data)
      }
    )
  })

  return await promise;
}


export default Index;
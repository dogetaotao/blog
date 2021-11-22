import React, {useState} from 'react';
import {Col, Row, List, Breadcrumb, Affix} from "antd"
import {BookTwoTone, CalendarTwoTone, EyeTwoTone} from "@ant-design/icons"
import ReactMarkdown from "react-markdown"
import MarkNav from "markdown-navbar"
import axios from "axios";
import "markdown-navbar/dist/navbar.css"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vs} from '../static/style/codestyle/index'
import Introduction from "../components/Introduction"
import Footer from "../components/Footer"
import Header from "../components/Head";
import servicePath from "../config/apiUrl";

const Details = (props) => {

  let markdown = props.article_content

  return (
    <div>
      <title>details</title>
      <Header/>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left-details" xs={24} sm={24} md={16} lg={14} xl={12}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><span>首页</span></Breadcrumb.Item>
              <Breadcrumb.Item><span>React</span></Breadcrumb.Item>
              <Breadcrumb.Item style={{color: "#1e90ff"}}>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detail-title">
              Promise、await/aysnc用法总结
            </div>
            <div className="detail-icons">
              <span className="icon-span">  <CalendarTwoTone/>   2021-11-23   </span>
              <span className="icon-span">  <BookTwoTone/>   React   </span>
              <span className="icon-span">  <EyeTwoTone/>   4</span>
            </div>
            <div className="detail-content">

              <ReactMarkdown
                children={markdown}
                escapeHtml={false}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={vs}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              />
            </div>
          </div>

        </Col>
        <Col className="common-right" xs={0} sm={0} md={6} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <Introduction/>
            <div className="details-nav right-parts">
              <div className="nav-menu">文章目录</div>
              <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              />
            </div>
          </Affix>

        </Col>
      </Row>
      <Footer/>
    </div>

  )
}

Details.getInitialProps = async(content) =>{
  console.log(content.query.id)

  let id = content.query.id

  const promise = new Promise((resolve) => {
    console.log(servicePath.getArticleById + id)
    axios(servicePath.getArticleById + id).then(
      (res) =>{
        console.log(res)
        resolve(res.data.data[0])
      }
    )

  })
  return await promise
}


export default Details;
import React, {useState, useEffect} from "react";
import {List, Row, Col, message, Modal, Button} from 'antd'
import axios from "axios";
import servicePath from "../config/apiUrl";

import '../static/css/articleList.css'
import {NavLink} from "react-router-dom";

const {confirm} = Modal

const ArticleList = () => {

  const [list, setList] = useState([])

  useEffect(() =>{
    getArticleList()
  },[])

  const getArticleList = ()=>{
    axios({
      method:'get',
      url:servicePath.getArticleList ,
      withCredentials:true
    }).then(
      (res) =>{
        setList(res.data.list)
      }
    )
  }

  const delArticle = (id) =>{
    confirm({
      title: '确定要删除这篇博客吗？',
      content: '如果点击ok按钮，文章将永远被删除',
      onOk(){
        axios({
          method:'get',
          url:servicePath.delArticle + id,
          withCredentials:true
        }).then(res=>{
          message.success('文章删除成功')
          let temList = [...list]
          temList.forEach(function (item, index , arr){
            if(item.id === id){
              arr.splice(index,1)
            }
          })
          setList(temList)
        })
      },
      onCancel() {
        message.success('取消删除成功')
      }
    })
  }

  const updateArticle =(id,check)=>{

  }



  return (
    <div>
      <List
        header={
          <Row className='list-div'>
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => {
          return(
            <List.Item>
              <Row  style={{width:'100%'}} className='list-div'>
                <Col span={8}>
                  {item.title}
                </Col>
                <Col span={4}>
                  {item.typeName}
                </Col>
                <Col span={4}>
                  {item.time}
                </Col>
                <Col span={4}>
                  {item.view_count}
                </Col>
                <Col span={4}>
                  <NavLink to={`/index/add/${item.id}`}><Button type='primary'>修改</Button></NavLink>
                  <Button onClick={()=>{delArticle(item.id)}}>删除</Button>
                </Col>
              </Row>
            </List.Item>
          )
        }}
      />
    </div>
  )
}



export default ArticleList
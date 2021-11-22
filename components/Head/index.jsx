import React ,{useState,useEffect}from "react";
import {Row, Col, Menu} from "antd"
import Router from "next/router"
import Link from "next/link"
import axios from "axios"
import servicePath from "../../config/apiUrl";

const Header = (props) => {

    const [navArray , setNavArray] = useState([])
    const [current , setCurrent] = useState(['0'])
    useEffect(() =>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then((res) =>{
                return res.data.data
            })
            setNavArray(result)
        }
        setCurrent(props.numberId)
        fetchData()
    },[])



    const handleClick = (e) =>{
        if(e.key == 0){
            Router.push('/')
        }
        if(e.key == 1){
            Router.push('/webtec')
        }
        if(e.key == 2){
            Router.push('/shuju')
        }
        if(e.key == 3){
            Router.push('/share')
        }
        if(e.key == 4){
            Router.push('/bibi')
        }
    }


    return (
      <div className="header">
          <Row type="flex" justify="center">
              <Col xs={24} sm={24} md={16} lg={10} xl={10}>
                  <span className="header-logo">dogetaotao</span>
                  <span className="header-text">————分享编程学习知识，一起努力学习</span>
              </Col>
              <Col xs={0} sm={0} md={18} lg={10} xl={8}>
                  <Menu mode="horizontal" selectedKeys={[current]} onClick={handleClick}>
                      <Menu.Item key="0">
                          首页
                      </Menu.Item>
                      {
                          navArray.map((item) =>{
                              return (
                                <Menu.Item key={item.id}>
                                    {item.typeName}
                                </Menu.Item>
                              )
                          })
                      }
                  </Menu>
              </Col>
          </Row>
      </div>
    )
}
export default Header
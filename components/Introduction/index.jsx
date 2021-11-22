import React from "react";
import {NavLink} from "react-router-dom"
import {Avatar, Divider} from "antd";
import {QqCircleFilled, WechatFilled, GithubFilled} from "@ant-design/icons"

const Introduce = () => {

  return (
    <div className="introduction right-parts">
      <div className="avatar"><Avatar size="100"
                                      src="https://tse1-mm.cn.bing.net/th/id/R-C.68150d7178b142c55d0534113633dae3?rik=VOANm8%2fGBlgaWg&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2fe40f9ca14f211b6aae3dff9eb73b379768b3cdef.jpg&ehk=ahc7IcYdlcfv3l9x0VNyDK2KWJFZfmwKlKBkCRPQDBU%3d&risl=&pid=ImgRaw&r=0"/>
      </div>
      <div className="right-introduce">
        <a className="right-name" href="javaScript:">dogetaotao</a>
        <div className="author-introduction">
          天坑专业,自学前端,还是菜鸟.
          <Divider>社交账号</Divider>
          <a className="right-icon" href="#"><QqCircleFilled/></a>
          <a className="right-icon" href="#"><WechatFilled/></a>
          <a className="right-icon" href="https://github.com/dogetaotao"><GithubFilled/></a>

        </div>
      </div>

    </div>
  )
}
export default Introduce
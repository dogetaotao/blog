import React , {useState,useRef,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {Card,Input,Button,Spin,message} from "antd"
import axios from "axios"
import servicePath from '../config/apiUrl'
import 'antd/dist/antd.css'
import '../static/css/Login.css'

function Login() {

  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  let navigate = useNavigate()
  const CheckLogin = () => {
    if(!userName){
      message.error('用户名不能为空')
      setTimeout(()=>{
        setIsLoading(false)
      },500)
      return false
    }else if(!password){
      message.error('密码不能为空')
      setTimeout(()=>{
        setIsLoading(false)
      },500)
      return false
    }
    let dataProps = {
      'userName' : userName,
      'password' : password
    }
    axios({
      method:'post',
      url:servicePath.checkLogin,
      data:dataProps,
      withCredentials:true
    }).then(
      res=>{
        setIsLoading(false)
        if(res.data.data === '登陆成功'){
          localStorage.setItem('openId',res.data.openId)
          navigate('/index')
        }else{
          message.error('用户名或者密码错误')
        }
      }
    )
  }


  return (
    <div className='login'>
      <div style={{height:"1em"}}>
      </div>
      <Spin tip='Loading' spinning={isLoading}>
        <Card title='Login in dogetaotao blog System' bordered={true} style={{width:400}}>
          <Input
            id="userName"
            size='large'
            placeholder='Enter your userName'

            onChange={(e) =>{setUserName(e.target.value)}}
          />
          <br/><br/>
          <Input.Password
            id='passWord'
            size='large'
            placeholder='Enter your password'
            onChange={(e) =>{setPassword(e.target.value)}}
          />
          <br/><br/>

          <Button type='primary' size='large' block onClick={CheckLogin}>Login in</Button>
        </Card>
      </Spin>
    </div>
  );

}

export default Login;
import React, {useState, useEffect} from "react"
import ReactMarkdown from "react-markdown"
import {Row, Col, Input, Button, Select, DatePicker, message} from 'antd'
import {vs} from "../static/codestyle/index";
import {useNavigate,useParams } from "react-router-dom";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import axios from "axios";
import moment from "moment";
import servicePath from "../config/apiUrl";
import "../static/css/AddArticle.css"


const {Option} = Select
const {TextArea} = Input

const AddArticle = (props) => {

  const [articleId, setArticleId] = useState(0)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState("")
  const [markdownContent, setmarkContent] = useState("预览内容")
  const [introducemd, setIntroducemd] = useState()
  const [introducehtml, setIntroducehtml] = useState("等待编辑")
  const [showDate, setShowDate] = useState()
  const [updateDate, setUpdateDate] = useState()
  const [typeInfo, setTypeInfo] = useState([])
  const [selectType, setSelectType] = useState('请选择类别')

  const navigate = useNavigate()

  let {id} = useParams()
  useEffect(() => {
    getTypeInfo()
    let temId = id
    if(temId){
      setArticleId(temId)
      getArticleById(temId)
    }
  }, [])

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    setmarkContent(e.target.value)
    if (e.target.value === "") {
      setmarkContent("等待编辑")
    }
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    setIntroducehtml(e.target.value)
    if (e.target.value === "") {
      setIntroducehtml("等待编辑")
    }
  }

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then(res => {
      if (res.data.check == '没有登录') {
        localStorage.removeItem('openId')
        navigate('/')
      } else {
        console.log(res.data.data)
        setTypeInfo(res.data.data)
        console.log(typeInfo)
      }
    })
  }

  const selectTypeHandler = (value) => {
    setSelectType(value)
    console.log(selectType)
  }


  const putArticle = () => {
    if (selectType === '请选择类型') {
      message.error('必须选择文章类型！')
      return false
    } else if (!articleTitle) {
      message.error('文章标题不能为空！')
    } else if (!articleContent) {
      message.error('文章内容不能为空！')
    } else if (!introducemd) {
      message.error('文章简介不能为空！')
    } else if (!showDate) {
      message.error('必须选择发布日期！')
    }

    let dataProps = {}
    dataProps.type_id = selectType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace('-', '/')
    dataProps.time = (new Date(dateText).getTime() / 1000)

    if (articleId === 0) {
      dataProps.view_count = 0

      axios({
        method: 'post',
        url: servicePath.putArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          setArticleId(res.data.insertId)
          if (res.data.isSuccess) {
            message.success('文章发布成功')
          } else {
            message.error('文章发布失败')
          }
        }
      )
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then(res => {
        if (res.data.isSuccess) {
          message.success('文章修改成功')
        } else {
          message.error('文章修改失败')
        }
      })
    }
  }

  const getArticleById = (id) => {
    axios(servicePath.getArticleById+id,{withCredentials:true}).then(
      res=>{
        let articleInfo = res.data.data[0]
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.article_content)
        setmarkContent(articleInfo.article_content)
        setIntroducemd(articleInfo.introduce)
        setIntroducehtml(articleInfo.introduce)
        setShowDate(articleInfo.time)
        setSelectType(articleInfo.type_id)
        console.log(res)
      }
    )
  }


  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={e => {
                  setArticleTitle(e.target.value)
                }}
              />
            </Col>
            <Col span={4}>
              <Select placeholder={selectType} defaultValue={selectType} size="large" onChange={selectTypeHandler}>
                {
                  typeInfo.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>{item.typeName}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
                placeholder="文章内容"
                onChange={changeContent}/>
            </Col>
            <Col span={12}>
              <div className="show-content">
                <ReactMarkdown
                  children={markdownContent}
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
            </Col>

          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              <Button className="Button-put" type="primary" size="large" onClick={putArticle}>发布文章</Button>
            </Col>
            <Col span={24}>
              <TextArea
                className="introduce-content"
                rows={4}
                value={introducemd}
                placeholder="文章简介"
                onChange={changeIntroduce}
              />
              <div className="show-introduce">
                <ReactMarkdown
                  children={introducehtml}
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
            </Col>
            <Col span={24}>
              <div className="put-date">
                <DatePicker
                  defaultPickerValue={moment(showDate)}
                  onChange={(date, dateString) => {
                    setShowDate(dateString)
                  }}
                  className="datepicker"
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )

}

export default AddArticle
import React from "react"
import {Tag} from "antd"
import Link from "next/link"

const Label = () => {
  return (
    <div className="label-content right-parts">
      <div className="label-title">标签</div>
      <div className="label-tag">
        <Link href="#"><Tag className="tag" color="blue">React</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">Vue</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">Node.Js</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">javaScript</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">资源</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">前端</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">逼逼叨</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">笔记整理</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">CSS</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">HTML</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">axios</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">异步编程</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">栈</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">数据结构与算法</Tag></Link>
        <Link href="#"><Tag className="tag" color="blue">Egg.js</Tag></Link>
      </div>
    </div>
  )
}

export default Label

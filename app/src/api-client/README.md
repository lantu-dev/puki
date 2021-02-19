[TOC]

# Web API中若干概念扫盲

>  Web API 是指 “使用HTTP协议通过网络调用的API”。API是“Application Programming Interface”的缩写，是软件组件的外部接口。也就是说某个软件集合体，人们能了解它的外部功能，但并不知道（也无需知道）其内部的运作细节，为了从外部调用该功能，需要指定该软件集合体的调用规范等信息，而这样的规范就是API。

### URL和URI的区别

- URL是全球资源定位符的英文所写，您平时上网时在IE浏览器中输入的那个地址就是URL。比方：网易 [http://www.baidu.com](http://www.baidu.com/)就是一个URL。
- URI是Web上可用的每种资源 - HTML文档、图像、视频片段、程序，由一个通过通用资源标志符(Universal Resource Identifier，简称"URI")进行定位。 

- URI是一个相对来说更广泛的概念。URL是URI的一种，是URI命名机制的一个子集，能够说URI是抽象的，而详细要使用URL来定位资源；
- Web上的每一种资源如：图片、文档、视频等，都是由URI定位的。这里所谓的定位指的是web上的资源相对于主机server来说，存放在server上的详细路径。

### 什么是端点（End point）

端点是指用于访问API的URI，由不同的功能而拥有不同的端点，如：http://api.example.com/search。

**端点的基本设计：**

- 短小便于输入
- 可以读懂
- 没有大小写混用，在《web设计标准》中，一般要求路径采用小写
- 修改方便
- 不会暴露服务架构
- 规则统一

### 什么是Flyio

[Fly.js](https://github.com/wendux/fly) 一个基于Promise的、强大的、支持多种JavaScript运行时的http请求库. 有了它，您可以使用一份http请求代码在浏览器、微信小程序、Weex、Node、React Native、快应用中都能正常运行。同时可以方便配合主流前端框架 ，最大可能的实现 Write Once Run Everywhere。

### 未完待续。。。



------



# Flyio——一个强大的http运行库


import './markdown.less';
import '../homepage/header.less';
import { useState } from 'react';
import { Link } from 'umi';
import { Layout, Menu, Button, Card, Avatar, Input } from 'antd';
const { Header, Content, Footer } = Layout;
import Markdown from 'react-markdown';
import { useAsync } from 'react-use';
import './github-markdown.css';
import Homepageheader from '@/components/HomePageheader';
import HomePageFooter from '@/components/HomePageFooter';

export default function MarkDownPages({ match }: any) {
  const url = '//cdn-file.blueprint.org.cn/show/' + match.params.name;
  // const url = "/md/show/%E8%8D%A3%E8%AA%89/2019-10-29_%E8%93%9D%E5%9B%BE%E5%8A%A9%E9%A1%BA%E5%90%AC%E8%AF%B4%E8%93%9D%E5%9B%BE%E8%A2%AB%E5%9B%BD%E5%8A%A1%E9%99%A2cue%E4%BA%86%EF%BC%9F.md";
  // console.log(match.params.name);
  const [md, setMd] = useState('');
  // const {body : md} = fetch(url);
  useAsync(async () => {
    fetch(url).then((r) => {
      r.text().then((s) => {
        setMd(s);
      });
    });
  });

  return (
    <Layout className="layout">
      <Homepageheader nowPage={4} />
      <Content className="TextPart">
        <Content className="markdown-body">
          <Markdown source={md} />
        </Content>
      </Content>

      <HomePageFooter />
    </Layout>
  );
}

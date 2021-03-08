import React, { useState } from 'react';

/* 
imgSrc: string;图片链接
textMain: string;活动描述
contentSrc: string;详细内容链接
*/
interface content {
  imgSrc: string;
  textMain: string;
  contentSrc: string;
}

export interface contentProps {
  contents: content[];
}

const data: contentProps = {
  contents: [
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '缩略图',
      contentSrc: 'https://www.baidu.com',
    },
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '活动描述',
      contentSrc: 'https://www.baidu.com',
    },
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '活动描述',
      contentSrc: 'https://www.baidu.com',
    },
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '活动描述',
      contentSrc: 'https://www.baidu.com',
    },
  ],
};

function SvgImg(props: content) {
  const { imgSrc, textMain, contentSrc } = props;
  return (
    <div
      style={{
        margin: '15px 15px 15px 15px',
      }}
    >
      <a
        href={contentSrc}
        style={{
          position: 'relative',
          textDecoration: 'none',
          color: 'black',
        }}
      >
        <img src={imgSrc} width="884px" height="166px" />
        <span
          style={{
            fontSize: '28px',
            textAlign: 'center',
            position: 'absolute',
            top: '-30px',
            left: '8px',
          }}
        >
          {textMain}
        </span>
      </a>
    </div>
  );
}

export function Page(props: contentProps) {
  const [selected, setSelected] = useState(['topic']);

  const onMenuClick = function ({ key, keyPath }: { key: any; keyPath: any }) {
    console.log(key);
    setSelected(keyPath);
  };
  return (
    <>
      {selected[0] === 'topic' ? (
        <div>
          {props.contents.map((v, i) => (
            <SvgImg key={i} {...v}></SvgImg>
          ))}
        </div>
      ) : (
        <div />
      )}
    </>
  );
}

export default function () {
  return <Page {...data} />;
}

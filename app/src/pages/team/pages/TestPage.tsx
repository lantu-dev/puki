import { Upload, message, Button, Form, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from '@/utils/uploadFile';
import { useState } from 'react';

export default function TestPage() {
  const [imgURL, setImgURL] = useState('');

  const onFinish = (value: any) => {
    uploadFile(value.header.file).then((imgURL) => {
      setImgURL(imgURL);
    });
  };

  console.log(imgURL);

  return (
    <div>
      <h1>测试页面</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="header" label="Header" valuePropName="logoFile">
          <Upload
            name="logo"
            // 解除Upload组件的默认行为
            beforeUpload={(file, fileList) => false}
            listType="picture"
          >
            <Button>
              <UploadOutlined /> 上传头像
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

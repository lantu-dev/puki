import Card from '@/assets/studentCard.svg';
import {Button} from 'antd';

export default function Identify() {
  return (
    <div>
      <div style={{padding: '4em 5em 2em 4em', textAlign: 'center'}}>
        请上传学生证中包含个人信息（学校、学院、学号、姓名）的页面照片！
      </div>
      <div style={{width: 'fit-content', margin: 'auto'}}>
        <img src={Card} alt="请上传学生证"/>
      </div>
      <div style={{padding: '0 2em', marginTop: '3em'}}>
        <Button
          block
          size="large"
          type="primary"
          onClick={() => {
            // TODO
          }}
        >
          申请学生身份认证
        </Button>
      </div>
    </div>
  );
}

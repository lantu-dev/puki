import styles from './index.less';
import { Button, DatePicker } from 'antd';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  );
}

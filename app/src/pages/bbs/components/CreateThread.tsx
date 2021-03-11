import { Input, Modal } from 'antd';
import { FunctionComponent, useRef, useState } from 'react';
import React from 'react';
import MdEditor from '@/components/MdEditorAsync';

import { IThread, ThreadService } from '@/backend/bbs';
import { call } from '@/utils/client';
import { MdEditorRef } from '@/components/MdEditor';

export interface CreateThreadProps {
  nodeID: number;
  replyFor: number;
  modalTitle: string;
  titleRequired?: boolean;
  onFinish?: (thread?: IThread) => void;
}

export const CreateThread: FunctionComponent<CreateThreadProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const editorRef = useRef<MdEditorRef>(null);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const text = editorRef.current!.getText();
    const data = await call(ThreadService.CreateThread, {
      NodeID: props.nodeID,
      ReplyForID: props.replyFor,
      Title: title,
      Abstract: text,
      Content: text,
    });
    console.log(data);
    setIsModalVisible(false);
    props.onFinish && props.onFinish(data.Thread);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.onFinish && props.onFinish();
  };
  return (
    <>
      <div onClick={showModal}>{props.children}</div>
      <Modal
        title={props.modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.titleRequired && (
          <Input
            placeholder="请输入标题..."
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        )}
        <MdEditor ref={editorRef} placeholder="请输入正文..." />
      </Modal>
    </>
  );
};

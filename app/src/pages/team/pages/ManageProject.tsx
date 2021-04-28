import React, { useState } from 'react';
import edit from '@/assets/team/img/edit.svg';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Row,
  Col,
  Table,
  Tag,
  Select,
  Typography,
  Modal,
} from 'antd';
import { call } from '@/utils/client';
import team, {
  GetOwnProjectsReq,
  GetOwnProjectsRes,
  OwnProject,
  Position,
} from '@/backend/team';
import { PubSub } from 'pubsub-ts';
import { useAsync } from 'react-use';
import style from '@/assets/team/css/expand.css';
import {
  CloseOutlined,
  EditFilled,
  EditOutlined,
  ExportOutlined,
  ToTopOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { history } from 'umi';

const { Title } = Typography;
interface ManageProjectProps {}

export default function ManageProject(props: ManageProjectProps) {
  const [isReadResumeVisible, setIsReadResumeVisible] = useState(false);
  const [resumeID, setResumeID] = useState(0);

  const handleCancelResume = () => {
    setIsReadResumeVisible(false);
  };

  //查阅简历
  //调用LookUpResume，操作录取或拒绝

  //录取
  const enroll = (ResumeID: number) => {
    console.log('录取' + ResumeID);
    call(team.ResumeService.LookUpResume, {
      ResumeID: ResumeID,
      IsEnrolled: true,
    }).then((r) => {
      console.log(r);
      location.reload();
    });
    setResumeID(0);
  };
  //拒绝
  const reject = (ResumeID: number) => {
    console.log('拒绝' + ResumeID);
    call(team.ResumeService.LookUpResume, {
      ResumeID: ResumeID,
      IsEnrolled: false,
    }).then((r) => {
      console.log(r);
      location.reload();
    });
  };

  const memberColumns = [
    {
      title: '成员姓名',
      dataIndex: 'MemberName',
      key: 'MemberName',
    },
    {
      title: '学院',
      dataIndex: 'Tags',
      key: 'Tags',
      render: (tags: any[]) => (
        <>
          {tags.map((tag, index) => {
            return <div key={index}>{tag.Name}</div>;
          })}
        </>
      ),
    },
  ];

  const [ownProjects, setOwnProjects] = useState([] as OwnProject[]);

  useAsync(async () => {
    call(team.ProjectService.GetOwnProjects, {}).then((r) => {
      if (!r.IsFailed) {
        setOwnProjects(r.OwnProjects);
      } else {
        alert('项目信息加载失败');
      }
    });
  });

  const [resumeContent, setResumeContent] = useState('');
  const [resumeSender, setResumeSender] = useState('');

  const resumeColumns = [
    {
      title: '简历投递者',
      dataIndex: 'SenderName',
      key: 'SenderName',
    },
    {
      title: '操作',
      dataIndex: 'ResumeID',
      key: 'ResumeID',
      render: (text: number) => (
        <div>
          <Button
            size={'small'}
            type={'default'}
            style={{ marginRight: '5px', width: '100px' }}
            onClick={() => {
              ownProjects?.forEach((project) => {
                project.OwnPositions?.forEach((position) => {
                  position.PositionResumes?.forEach((resume) => {
                    if (resume.ResumeID === text) {
                      setResumeContent(resume.Content);
                      setResumeSender(resume.SenderName);
                      setResumeID(resume.ResumeID);
                    }
                  });
                });
              });
              setIsReadResumeVisible(true);
            }}
          >
            查看简历
          </Button>
          <div style={{ height: '5px' }} />

          <Button
            size={'small'}
            type={'primary'}
            danger
            onClick={() => {
              reject(text);
            }}
          >
            拒绝
          </Button>
          <Button
            onClick={() => {
              enroll(text);
            }}
            size={'small'}
            type={'primary'}
            style={{ marginLeft: '5px' }}
          >
            录用
          </Button>
        </div>
      ),
    },
  ];

  console.log(ownProjects);

  return (
    <div style={{ padding: '5px' }}>
      <Title level={3}>项目管理中心</Title>

      <div
        style={{
          position: 'absolute',
          right: '15px',
          top: '10px',
          cursor: 'pointer',
        }}
        onClick={() => {
          history.goBack();
        }}
      >
        <CloseOutlined />
      </div>
      {ownProjects?.map((ownproject, projectIndex) => (
        <div key={projectIndex} className={style.CardManageProject}>
          <Title level={4}>{ownproject.ProjectName}</Title>
          <Title level={5}>操作：</Title>
          <Row wrap={false} style={{ marginTop: '-5px', marginBottom: '5px' }}>
            <Col span={8} style={{ paddingRight: '10px' }}>
              <div>
                <Button
                  block={true}
                  onClick={() => {
                    history.replace(
                      'ProjectDetailSingle?ProjectID=' + ownproject.ProjectID,
                    );
                  }}
                  icon={<EditOutlined />}
                  type={'primary'}
                >
                  编辑
                </Button>
              </div>
            </Col>
            <Col span={8} style={{ paddingRight: '10px' }}>
              <div style={{ textAlign: 'center' }}>
                {ownproject.IsAvailable ? (
                  <Button
                    block={true}
                    danger={true}
                    icon={<VerticalAlignBottomOutlined />}
                    type={'primary'}
                  >
                    下线
                  </Button>
                ) : (
                  <Button type={'primary'} icon={<ToTopOutlined />}>
                    上线
                  </Button>
                )}
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'right' }}>
                <Button
                  block={true}
                  disabled={true}
                  icon={<ExportOutlined />}
                  type={'primary'}
                >
                  导出
                </Button>
              </div>
            </Col>
          </Row>
          {ownproject.OwnPositions?.map((ownPosition, positionIndex) => (
            <div
              key={positionIndex}
              className={style.CardManageProjectPosition}
            >
              <Title level={5}>{ownPosition.PositionName}</Title>
              <div>
                <Table
                  pagination={false}
                  dataSource={ownPosition.PositionMembers}
                  columns={memberColumns}
                />
                <div style={{ height: '10px' }} />
                <Table
                  pagination={false}
                  dataSource={ownPosition.PositionResumes}
                  columns={resumeColumns}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <Modal
        title={'简历详情'}
        visible={isReadResumeVisible}
        onCancel={handleCancelResume}
        footer={null}
      >
        <p>{resumeContent}</p>
        <p style={{ textAlign: 'right' }}>From: {resumeSender}</p>
        <div style={{ textAlign: 'right' }}>
          <Button
            type={'primary'}
            danger
            style={{ marginRight: '5px' }}
            onClick={() => {
              reject(resumeID);
            }}
          >
            拒绝
          </Button>
          <Button
            type={'primary'}
            onClick={() => {
              enroll(resumeID);
            }}
          >
            录取
          </Button>
        </div>
      </Modal>
    </div>
  );
}

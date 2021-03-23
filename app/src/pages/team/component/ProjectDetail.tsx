import team from '@/backend/team';
import auth from '@/backend/auth';
import { call } from '@/utils/client';
import style from '@/assets/team/css/expand.css';
import {
  EditOutlined,
  FileTextOutlined,
  LikeFilled,
  LikeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  MessageOutlined,
  ArrowLeftOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Form,
  Image,
  InputNumber,
  Input,
  Modal,
  Progress,
  Row,
  Typography,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

const { Title, Paragraph, Text } = Typography;
import { Anchor } from 'antd';
import { history } from 'umi';
const { Link } = Anchor;
//来自ProjectCard的项目简略信息，这部分信息不需要再从数据库重新获取
interface ProjectDetailProps {
  ProjectID: number;
  ProjectName: string;
  ProjectDescription: string;
  PositionNames: string[];
  CompetitionNames: string[];
}

export default function ProjectDetail(props: ProjectDetailProps) {
  const [likeNum, setLikeNum] = useState(0);
  const [isLike, setIsLike] = useState(false);
  //判断是否是创建者，用来决定”编辑按钮“的有无
  const [isCreator, setIsCreator] = useState(false);
  //此处为浏览的用户
  const [user, setUser] = useState({
    AvatarURI: '',
    RealName: '',
    NickName: '',
  });
  const [resume, setResume] = useState({
    Resumes: [{ PositionName: '', PositionID: 0, Content: '' }],
  });

  let isSinglePage = false;

  //如果该component作为单独页面，则需从location中获取属性
  // @ts-ignore
  if (props.location) {
    // @ts-ignore
    props = {
      // @ts-ignore
      ProjectID: Number(props.location.query.ProjectID),
      // @ts-ignore
      ProjectName: props.location.query.ProjectName,
      // @ts-ignore
      ProjectDescription: props.location.query.ProjectDescription,
      // @ts-ignore
      PositionNames: props.location.query.PositionNames,
      // @ts-ignore
      CompetitionNames: props.location.query.CompetitionNames,
    };
    isSinglePage = true;
  }

  const ShareProject = () => {
    let URL = window.location.href + '/ProjectDetail?';
    URL += 'ProjectID=' + props.ProjectID.toString() + '&';
    URL += 'ProjectName=' + props.ProjectName + '&';
    URL += 'ProjectDescription=' + props.ProjectDescription + '&';
    URL += 'PositionNames=' + props.PositionNames + '&';
    URL += 'CompetitionNames=' + props.CompetitionNames;
    console.log(URL);
  };

  //项目详情信息
  const [projectDetailState, setProjectDetailState] = useState({
    DescribeDetail: '',
    LinkURL: '',
    EndTime: '',
    CreatorName: '',
    CreatorSchool: '',
    CreatorGrade: '',
    CreatorAvatarURI: '',
    CreatorAward: [
      {
        CompetitionID: 0,
        CompetitionName: '',
        AwardRanking: '',
        ProveImgURL: '',
      },
    ],
    Comments: [{ CreatorName: '', Content: '' }],
    Positions: [
      {
        ID: 0,
        Name: '',
        NowPeople: 0,
        NeedPeople: 0,
        InterestPeople: 0,
        Describe: '',
      },
    ],
  });

  const [editPositionInitialVal, setEditPositionInitialVal] = useState({
    positionNeedNum: [0],
    positionRequirement: [''],
  });
  const [editAwardInitialVal, setEditAwardInitialVal] = useState({
    awardRank: [''],
    awardProve: [''],
  });
  const [signUpInitialVal, setSignUpInitialVal] = useState({
    resumeContent: [''],
  });

  //加载项目信息 -------------------------------------------------------------------------------------------------------
  useAsync(async () => {
    call(auth.UserService.FindUserInTeam, {
      ProjectID: props.ProjectID,
    })
      .then((r) => {
        setUser(r);
        return call(team.ProjectService.GetProjectDetail, {
          ProjectID: props.ProjectID,
        });
      })
      .then((r) => {
        setProjectDetailState(r);
        return call(team.ResumeService.GetResumes, {
          ProjectID: props.ProjectID,
        });
      })
      .then((r) => {
        if (r.IsFailed) {
        } else {
          setResume({ Resumes: r.ResumeSimples });
        }
      });
  });

  let needNums: number[] = [];
  let describes: string[] = [];

  let awardRanks: string[] = [];
  let awardProves: string[] = [];

  const [exclusion, setExclusion] = useState({
    positionNames: [''],
    competitionNames: [''],
    resumePositionNames: [''],
  });
  let positionNames: string[] = [];
  let competitionNames: string[] = [];
  let resumePositionNames: string[] = [];
  let resumeContent: string[] = [];

  useEffect(() => {
    if (
      user.RealName === projectDetailState.CreatorName &&
      user.RealName != '' &&
      projectDetailState.CreatorName != ''
    ) {
      setIsCreator(true);
    }
    projectDetailState.Positions?.forEach((value, index) => {
      needNums.push(value.NeedPeople);
      describes.push(value.Describe);
      positionNames.push(value.Name);
    });
    projectDetailState.CreatorAward?.forEach((value1, index) => {
      awardRanks.push(value1.AwardRanking);
      awardProves.push(value1.ProveImgURL);
      competitionNames.push(value1.CompetitionName);
    });
    setEditPositionInitialVal({
      positionNeedNum: needNums,
      positionRequirement: describes,
    });
    setEditAwardInitialVal({
      awardRank: awardRanks,
      awardProve: awardProves,
    });
    resume.Resumes?.forEach((value) => {
      resumeContent.push(value.Content);
      resumePositionNames.push(value.PositionName);
    });
    setExclusion({
      positionNames: positionNames,
      competitionNames: competitionNames,
      resumePositionNames: resumePositionNames,
    });
  }, [projectDetailState]);

  useEffect(() => {
    resume.Resumes?.forEach((value) => {
      resumeContent.push(value.Content);
      resumePositionNames.push(value.PositionName);
    });
    setSignUpInitialVal({
      resumeContent: resumeContent,
    });
  }, [resume]);

  //编辑项目详情 -------------------------------------------------------------------------------------------------------
  const [editProjectDetailVisible, setEditProjectDetailVisible] = useState(
    false,
  );
  const showEditProjectDetailModal = () => {
    setEditProjectDetailVisible(true);
  };
  const onEditProjectDetailCancel = () => {
    setEditProjectDetailVisible(false);
  };
  const onEditProjectDetailFinish = (value: any) => {
    call(team.ProjectService.EditProjectDetail, {
      Content: value.projectDetail,
      ProjectID: props.ProjectID,
    }).then((r) => {
      if (r.IsFailed) {
      } else {
        call(team.ProjectService.GetProjectDetail, {
          ProjectID: props.ProjectID,
        }).then((r) => {
          setProjectDetailState(r);
        });
        setEditProjectDetailVisible(false);
      }
    });
  };

  //编辑岗位详情 ---------------------------------------------------------------------------------------------------------
  const [editPositionVisible, setEditPositionVisible] = useState(false);

  const showEditPositionModal = () => {
    setEditPositionVisible(true);
  };
  const onEditPositionCancel = () => {
    setEditPositionVisible(false);
  };
  const onEditPositionFinish = (value: any) => {
    let positionNames: string[] = [];
    let positionIDs: number[] = [];
    projectDetailState.Positions?.forEach((value1, index) => {
      positionNames.push(value1.Name);
      positionIDs.push(value1.ID);
    });
    if (value.newPosition) {
      call(team.PositionService.EditPosition, {
        ProjectID: props.ProjectID,
        PositionIDs: positionIDs,
        PositionNames: positionNames,
        PositionNeedNums: value.positionNeedNum,
        PositionRequirements: value.positionRequirement,
        NewPosition: {
          Names: value.newPosition[0],
          NeedNums: value.newPosition[1],
          Requirements: value.newPosition[2],
        },
      }).then((r) => {
        if (r.IsFailed) {
        } else {
          call(team.ProjectService.GetProjectDetail, {
            ProjectID: props.ProjectID,
          }).then((r) => {
            setProjectDetailState(r);
          });
          setEditPositionVisible(false);
        }
      });
    } else {
      call(team.PositionService.EditPosition, {
        ProjectID: props.ProjectID,
        PositionIDs: positionIDs,
        PositionNames: positionNames,
        PositionNeedNums: value.positionNeedNum,
        PositionRequirements: value.positionRequirement,
        NewPosition: {
          Names: [],
          NeedNums: [],
          Requirements: [],
        },
      }).then((r) => {
        if (r.IsFailed) {
        } else {
          call(team.ProjectService.GetProjectDetail, {
            ProjectID: props.ProjectID,
          }).then((r) => {
            setProjectDetailState(r);
          });
          setEditPositionVisible(false);
        }
      });
    }
  };

  //--------------------------------------------------------------------------------------------------------------------

  //编辑获奖情况 ---------------------------------------------------------------------------------------------------------
  const [editAwardVisible, setEditAwardVisible] = useState(false);

  const showEditAwardModal = () => {
    setEditAwardVisible(true);
  };
  const onEditAwardCancel = () => {
    setEditAwardVisible(false);
  };
  const onEditAwardFinish = (value: any) => {
    console.log(value);
    let competitionIDs: number[] = [];
    projectDetailState.CreatorAward?.forEach((value1, index) => {
      competitionIDs.push(value1.CompetitionID);
    });
    if (value.newAward) {
      call(team.ProjectService.EditAward, {
        ProjectID: props.ProjectID,
        CompetitionIDs: competitionIDs,
        AwardRanks: value.awardRank,
        AwardProves: value.awardProve,
        NewAward: {
          CompetitionNames: value.newAward[0],
          AwardRanks: value.newAward[1],
          AwardProves: value.newAward[2],
        },
      }).then((r) => {
        if (r.IsFailed) {
        } else {
          call(team.ProjectService.GetProjectDetail, {
            ProjectID: props.ProjectID,
          }).then((r) => {
            setProjectDetailState(r);
          });
          setEditAwardVisible(false);
        }
      });
    } else {
      call(team.ProjectService.EditAward, {
        ProjectID: props.ProjectID,
        CompetitionIDs: competitionIDs,
        AwardRanks: value.awardRank,
        AwardProves: value.awardProve,
        NewAward: {
          CompetitionNames: [],
          AwardRanks: [],
          AwardProves: [],
        },
      }).then((r) => {
        if (r.IsFailed) {
        } else {
          call(team.ProjectService.GetProjectDetail, {
            ProjectID: props.ProjectID,
          }).then((r) => {
            setProjectDetailState(r);
          });
          setEditAwardVisible(false);
        }
      });
    }
  };

  //--------------------------------------------------------------------------------------------------------------------

  //报名 ---------------------------------------------------------------------------------------------------------
  const [signUpVisible, setSignUpVisible] = useState(false);

  const showSignUpModal = () => {
    setSignUpVisible(true);
  };
  const onSignUpCancel = () => {
    setSignUpVisible(false);
  };

  const onSignUpFinish = (value: any) => {
    console.log(value);
    let positionIDs: number[] = [];
    resume.Resumes?.forEach((value1) => {
      positionIDs.push(value1.PositionID);
    });
    if (value.newResume) {
      call(team.ResumeService.EditResume, {
        ProjectID: props.ProjectID,
        PositionIDs: positionIDs,
        Contents: value.resumeContent,
        NewResume: {
          PositionNames: value.newResume[0],
          Contents: value.newResume[1],
        },
      }).then((r) => {
        if (r.IsFailed) {
        } else {
          call(team.ProjectService.GetProjectDetail, {
            ProjectID: props.ProjectID,
          }).then((r) => {
            setProjectDetailState(r);
          });
          setSignUpVisible(false);
        }
      });
    } else {
      call(team.ResumeService.EditResume, {
        ProjectID: props.ProjectID,
        PositionIDs: positionIDs,
        Contents: value.resumeContent,
        NewResume: {
          PositionNames: [],
          Contents: [],
        },
      }).then((r) => {
        if (r.IsFailed) {
        } else {
          call(team.ProjectService.GetProjectDetail, {
            ProjectID: props.ProjectID,
          }).then((r) => {
            setProjectDetailState(r);
          });
          setSignUpVisible(false);
        }
      });
    }
  };

  //--------------------------------------------------------------------------------------------------------------------

  const onCommentFinish = (value: any) => {
    call(team.CommentService.CreateComment, {
      ProjectID: props.ProjectID,
      Content: value.comment,
    }).then((r) => {
      if (r.IsFailed) {
      } else {
        call(team.ProjectService.GetProjectDetail, {
          ProjectID: props.ProjectID,
        }).then((r) => {
          setProjectDetailState(r);
        });
        setEditPositionVisible(false);
      }
    });
  };

  return (
    <div style={{ margin: '2%', minWidth: '300px' }}>
      <Title level={3}>{props.ProjectName}</Title>
      <div
        style={{ position: 'absolute', right: '15px', top: '12px' }}
        hidden={!isSinglePage}
        onClick={() => {
          history.goBack();
        }}
      >
        <CloseOutlined style={{ fontSize: '15px' }} />
      </div>
      <Row style={{ width: '100%' }} wrap={false}>
        <Col flex={'10px'}> </Col>
        <Col flex={'30%'}>
          <Image
            width={'100%'}
            src={`https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1870521716,857441283&fm=26&gp=0.jpg`}
          />
        </Col>
        <Col flex={'10px'}> </Col>
        <Col flex={'auto'}>
          <Paragraph
            style={{ fontSize: '16px' }}
            ellipsis={{ rows: 4, expandable: true, symbol: '展开' }}
          >
            {props.ProjectDescription}
          </Paragraph>
        </Col>
      </Row>
      <Row style={{ width: '100%', minWidth: '300px' }} wrap={false}>
        <Col flex={'2%'}> </Col>
        <Col flex={'30%'} style={{ height: '60px' }}>
          <div style={{ marginTop: '10px' }}>
            <div>
              <Text>截止日期</Text>
            </div>
            <div>
              <Text>{projectDetailState.EndTime}</Text>
            </div>
          </div>
        </Col>
        <Col flex={'2%'}> </Col>
        <Col flex={'21%'}>
          <div style={{ cursor: 'pointer' }} onClick={() => {}}>
            <div
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                width: '80%',
                height: '60px',
              }}
              className={style.Box}
            >
              <div style={{ textAlign: 'center', fontSize: '18px' }}>
                <FileTextOutlined />
              </div>
              <div style={{ textAlign: 'center' }}>详情</div>
            </div>
          </div>
        </Col>
        <Col flex={'21%'}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (isLike) {
                setIsLike(false);
              } else {
                setIsLike(true);
              }
            }}
          >
            <div
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                width: '80%',
                height: '60px',
              }}
              className={style.Box}
            >
              <div style={{ textAlign: 'center', fontSize: '18px' }}>
                {isLike ? <LikeFilled /> : <LikeOutlined />}
              </div>
              <div style={{ textAlign: 'center' }}>很赞</div>
            </div>
          </div>
        </Col>
        <Col flex={'21%'}>
          <div style={{ cursor: 'pointer' }} onClick={() => {}}>
            <div
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                width: '80%',
                height: '60px',
              }}
              className={style.Box}
            >
              <div style={{ textAlign: 'center', fontSize: '18px' }}>
                <MessageOutlined />
              </div>
              <div style={{ textAlign: 'center' }}>评论</div>
            </div>
          </div>
        </Col>
        <Col flex={'2%'}> </Col>
      </Row>
      <div
        className={style.Box}
        style={{ marginTop: '15px', position: 'relative' }}
      >
        {isCreator ? (
          <Button
            style={{ position: 'absolute', top: '0px', right: '-5px' }}
            type={'link'}
            onClick={() => {
              setEditAwardVisible(true);
            }}
          >
            <EditOutlined />
          </Button>
        ) : null}
        <Row style={{ margin: '10px' }} wrap={false}>
          <Col flex={'60%'}>
            <Text>发起人</Text>
            <Row style={{ marginTop: '10px' }}>
              <Col flex={'50px'}>
                <Avatar
                  src={projectDetailState.CreatorAvatarURI}
                  style={{ marginTop: '5px' }}
                  size={35}
                />
              </Col>
              <Col flex={'auto'}>
                <Title level={5}>{projectDetailState.CreatorName}</Title>
                <div style={{ marginTop: '-10px' }}>
                  <Text>{projectDetailState.CreatorSchool}</Text>
                </div>
              </Col>
            </Row>
          </Col>
          <Col flex={'40%'} style={{ marginTop: '10px' }}>
            <Paragraph
              style={{ fontSize: '16px', color: 'gray', whiteSpace: 'pre' }}
              ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
            >
              {projectDetailState.CreatorAward?.filter(
                (v) => v.AwardRanking != '',
              )
                .map((v) => v.CompetitionName + ' ' + v.AwardRanking)
                .join('\n')}
            </Paragraph>
          </Col>
        </Row>
      </div>
      <div
        className={style.Box}
        style={{ marginTop: '5px', position: 'relative' }}
      >
        {isCreator ? (
          <Button
            style={{ position: 'absolute', top: '0px', right: '-5px' }}
            type={'link'}
            onClick={() => {
              setEditPositionVisible(true);
            }}
          >
            <EditOutlined />
          </Button>
        ) : null}
        <div style={{ margin: '10px' }}>
          <div>招募</div>
          {projectDetailState.Positions
            ? projectDetailState.Positions.map((value, index) => (
                <div key={index} style={{ marginTop: '10px' }}>
                  <Row wrap={false}>
                    <Col flex={'25%'}>
                      <Text strong>{value.Name}</Text>
                    </Col>
                    <Col flex={'42%'}>
                      <Progress
                        percent={(value.NowPeople / value.NeedPeople) * 100}
                        steps={value.NeedPeople}
                        showInfo={false}
                      />
                    </Col>
                    <Col flex={'15%'}>录用：{value.NowPeople}</Col>
                    <Col flex={'3%'}> </Col>
                    <Col flex={'15%'}>投递：{value.InterestPeople}</Col>
                  </Row>
                  <Paragraph
                    style={{ fontSize: '16px', color: 'gray' }}
                    ellipsis={{ rows: 1, expandable: true, symbol: '展开' }}
                  >
                    岗位需求: {value.Describe}
                  </Paragraph>
                </div>
              ))
            : false}
        </div>
      </div>
      <div
        id="detail"
        className={style.Box}
        style={{ marginTop: '5px', position: 'relative' }}
      >
        {isCreator ? (
          <Button
            onClick={showEditProjectDetailModal}
            style={{ position: 'absolute', top: '0px', right: '-5px' }}
            type={'link'}
          >
            <EditOutlined />
          </Button>
        ) : null}
        <div style={{ margin: '10px' }}>
          <div>详情</div>
          <div>
            {projectDetailState.DescribeDetail
              ? projectDetailState.DescribeDetail
              : null}
          </div>
        </div>
      </div>
      <div
        id="comment"
        className={style.Box}
        style={{ marginTop: '5px', position: 'relative' }}
      >
        <div style={{ margin: '10px' }}>
          <div>评论</div>
          <div>
            {projectDetailState.Comments
              ? projectDetailState.Comments.filter(
                  (value) => value.Content != '',
                ).map((value, index) => (
                  <Row key={index}>
                    <Col flex={'35px'}>
                      <Avatar style={{ margin: '10px' }} size={35}>
                        {' '}
                      </Avatar>
                    </Col>
                    <Col flex={'auto'}>
                      <Title level={5}>{value.CreatorName}</Title>
                      <div style={{ marginTop: '-10px' }}>{value.Content}</div>
                    </Col>
                  </Row>
                ))
              : false}
          </div>
          <div>
            <Row>
              <Col flex={'35px'}>
                <Avatar
                  src={user.AvatarURI}
                  style={{ margin: '10px' }}
                  size={35}
                >
                  {' '}
                </Avatar>
              </Col>
              <Col flex={'auto'}>
                <Title level={5}>{user.RealName}</Title>
                <div style={{ marginTop: '-10px' }}>
                  <Form
                    style={{ marginTop: '15px' }}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onCommentFinish}
                  >
                    <Form.Item name="comment">
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                      style={{
                        textAlign: 'right',
                        marginTop: '-15px',
                        marginBottom: '5px',
                      }}
                    >
                      <Button type="default" htmlType="submit">
                        评论
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={style.Box} style={{ marginTop: '5px' }}>
        <Row style={{ margin: '10px' }}>
          <Col flex={'35px'}>
            <Button type={'default'} onClick={ShareProject}>
              分享
            </Button>
          </Col>
          <Col flex={'2%'}> </Col>
          <Col flex={'105px'}>
            <Button disabled={true} type={'default'}>
              联系发起人
            </Button>
          </Col>
          <Col flex={'auto'}> </Col>
          <Col flex={'20px'}>
            <Button
              onClick={() => {
                setSignUpVisible(true);
              }}
              type={'primary'}
            >
              报名
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{ height: '10px' }}> </div>

      <Modal
        title="编辑项目详情"
        visible={editProjectDetailVisible}
        footer={null}
        onCancel={onEditProjectDetailCancel}
      >
        <div style={{ marginTop: '-30px', marginBottom: '20px' }}>
          <Text type={'secondary'}>请输入项目的具体介绍</Text>
        </div>
        <Form
          name="projectDetail"
          initialValues={{
            projectDetail: projectDetailState.DescribeDetail
              ? projectDetailState.DescribeDetail
              : '',
          }}
          onFinish={onEditProjectDetailFinish}
        >
          <Form.Item name="projectDetail">
            <Input.TextArea
              placeholder={'请输入项目详情'}
              autoSize={{ minRows: 3, maxRows: 12 }}
            />
          </Form.Item>
          <Form.Item>
            <Row wrap={false}>
              <Col flex={'30%'}>
                <Button onClick={onEditProjectDetailCancel} block={true}>
                  取消
                </Button>
              </Col>
              <Col flex={'5%'}> </Col>
              <Col flex={'65%'}>
                <Button block={true} type="primary" htmlType="submit">
                  确认
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑岗位"
        visible={editPositionVisible}
        footer={null}
        onCancel={onEditPositionCancel}
      >
        <div style={{ marginTop: '-30px' }}>
          <Text type={'secondary'}>第一个输入框输入岗位需求人数</Text>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Text type={'secondary'}>第二个输入框输入岗位具体需求</Text>
        </div>
        <Form
          name="editPosition"
          onFinish={onEditPositionFinish}
          initialValues={editPositionInitialVal}
        >
          {projectDetailState.Positions.map((value, index) => (
            <div style={{ marginBottom: '15px' }} key={index}>
              <Title level={5}>{value.Name}</Title>
              <Form.Item name={['positionNeedNum', index]}>
                <InputNumber
                  placeholder={
                    '请输入岗位需求人数：' + value.NeedPeople.toString()
                  }
                  max={5}
                  style={{ width: '180px' }}
                />
              </Form.Item>
              <Form.Item
                name={['positionRequirement', index]}
                style={{ marginTop: '-15px' }}
              >
                <Input.TextArea placeholder={'请输入岗位需求描述'} />
              </Form.Item>
            </div>
          ))}
          <Form.List name="newPosition">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <div style={{ marginBottom: '0px', width: '100%' }}>
                      <Title level={5}>新项目</Title>
                      <Form.Item
                        name={['0', index]}
                        hasFeedback
                        style={{ width: '100%', marginBottom: '10px' }}
                      >
                        <Select placeholder="请选择岗位">
                          {props.PositionNames.filter(
                            (value) =>
                              value != '全部岗位' &&
                              !exclusion.positionNames.includes(value),
                          ).map((value, index2) => (
                            <Select.Option key={index2} value={value}>
                              {value}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name={['1', index]}>
                        <InputNumber
                          placeholder={'请输入岗位需求人数'}
                          max={5}
                          style={{ width: '180px' }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={['2', index]}
                        style={{ marginTop: '-15px' }}
                      >
                        <Input.TextArea placeholder={'请输入岗位需求描述'} />
                      </Form.Item>
                    </div>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加岗位
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Row wrap={false}>
              <Col flex={'30%'}>
                <Button onClick={onEditProjectDetailCancel} block={true}>
                  取消
                </Button>
              </Col>
              <Col flex={'5%'}> </Col>
              <Col flex={'65%'}>
                <Button block={true} type="primary" htmlType="submit">
                  确认
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑获奖情况"
        visible={editAwardVisible}
        footer={null}
        onCancel={onEditAwardCancel}
      >
        <div style={{ marginTop: '-30px' }}>
          <Text type={'secondary'}>第一个选择框选择该比赛所获奖项</Text>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Text type={'secondary'}>第二个输入框输入获奖的证明链接</Text>
        </div>
        <Form
          name="editPosition"
          onFinish={onEditAwardFinish}
          initialValues={editAwardInitialVal}
        >
          {projectDetailState.CreatorAward?.map((value, index) => (
            <div style={{ marginBottom: '15px' }} key={index}>
              <Title level={5}>{value.CompetitionName}获奖</Title>
              <Form.Item name={['awardRank', index]}>
                <Select placeholder="请选择奖项">
                  <Select.Option value="特等奖">特等奖</Select.Option>
                  <Select.Option value="一等奖">一等奖</Select.Option>
                  <Select.Option value="二等奖">二等奖</Select.Option>
                  <Select.Option value="三等奖">三等奖</Select.Option>
                  <Select.Option value="暂未获得">暂未获得</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ marginTop: '-15px' }}
                name={['awardProve', index]}
              >
                <Input placeholder="请输入获奖证明连接" />
              </Form.Item>
            </div>
          ))}
          <Form.List name="newAward">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <div style={{ marginBottom: '0px', width: '100%' }}>
                      <Title level={5}>新奖项</Title>
                      <Form.Item name={['0', index]}>
                        <Select placeholder="请选择比赛">
                          {props.CompetitionNames.filter(
                            (value) =>
                              !exclusion.competitionNames.includes(value),
                          ).map((value, index) => (
                            <Select.Option value={value} key={index}>
                              {value}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={['1', index]}
                        hasFeedback
                        style={{
                          width: '100%',
                          marginBottom: '10px',
                          marginTop: '-12px',
                        }}
                      >
                        <Select placeholder="请选择奖项">
                          <Select.Option value="特等奖">特等奖</Select.Option>
                          <Select.Option value="一等奖">一等奖</Select.Option>
                          <Select.Option value="二等奖">二等奖</Select.Option>
                          <Select.Option value="三等奖">三等奖</Select.Option>
                          <Select.Option value="暂未获得">
                            暂未获得
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['2', index]}>
                        <Input placeholder="请输入获奖证明连接" />
                      </Form.Item>
                    </div>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加获奖条目
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Row wrap={false}>
              <Col flex={'30%'}>
                <Button onClick={onEditAwardCancel} block={true}>
                  取消
                </Button>
              </Col>
              <Col flex={'5%'}> </Col>
              <Col flex={'65%'}>
                <Button block={true} type="primary" htmlType="submit">
                  确认
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="报名项目"
        visible={signUpVisible}
        footer={null}
        onCancel={onSignUpCancel}
      >
        <div style={{ marginTop: '-30px' }}>
          <Text type={'secondary'}>第一个选择框选择报名岗位</Text>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Text type={'secondary'}>第二个输入框输入简历</Text>
        </div>
        <Form
          name="signUp"
          onFinish={onSignUpFinish}
          initialValues={signUpInitialVal}
        >
          {resume.Resumes?.map((value, index) => (
            <div style={{ marginBottom: '15px' }} key={index}>
              <Title level={5}>{value.PositionName}</Title>
              <Form.Item name={['resumeContent', index]}>
                <Input placeholder="请输入该岗位简历" />
              </Form.Item>
            </div>
          ))}
          <Form.List name="newResume">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <div style={{ marginBottom: '0px', width: '100%' }}>
                      <Title level={5}>新简历</Title>
                      <Form.Item name={['0', index]}>
                        <Select placeholder="请选择岗位">
                          {projectDetailState.Positions.filter(
                            (value) =>
                              !exclusion.resumePositionNames.includes(
                                value.Name,
                              ),
                          ).map((value, index) => (
                            <Select.Option value={value.Name} key={index}>
                              {value.Name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name={['1', index]}>
                        <Input placeholder="请输入该岗位简历" />
                      </Form.Item>
                    </div>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加岗位
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Row wrap={false}>
              <Col flex={'30%'}>
                <Button onClick={onEditAwardCancel} block={true}>
                  取消
                </Button>
              </Col>
              <Col flex={'5%'}> </Col>
              <Col flex={'65%'}>
                <Button block={true} type="primary" htmlType="submit">
                  确认
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

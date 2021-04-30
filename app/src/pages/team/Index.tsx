import team from '@/backend/team';
import { call, hasLogged } from '@/utils/client';
import { ProjectSimple } from '@/backend/team';
import { Drawer, List } from 'antd';
import { useAsync, useSetState } from 'react-use';
import Filter from './component/Filter';
import ProjectCard from './component/ProjectCard';
import ProjectDetail from './component/ProjectDetail';
import { PubSub } from 'pubsub-ts';
import CreateProject from '@/pages/team/pages/CreateProject';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { history } from '@@/core/history';

export default function Index(key?: string) {
  if (!hasLogged()) {
    //若为游客登录，则逻辑上不能创建项目，跳转至登录页
    history.push('/auth/phone-login');
  }

  //@ts-ignore
  console.log(PUBLIC_PATH);

  const [state, setState] = useSetState({
    filter: (projectSimple: ProjectSimple): boolean => true,
    projectDetailDrawerVisible: false,
    createProjectDrawerVisible: false,
    projectSimple: {} as ProjectSimple,
    typeList: {
      competitionNames: [''],
      competitionTypes: [''],
      positionNames: [''],
    },
  });

  const projectsState = useAsync(async () => {
    let res = await call(team.ProjectService.GetProjectSimples, {
      ProjectID: [],
    });
    return res.ProjectSimples;
  });

  let subscriber = new PubSub.Subscriber();
  subscriber.on('createProjectDrawerVisible', (n: PubSub.Notification) => {
    setState({ createProjectDrawerVisible: n.body });
  });
  subscriber.on('typeList', (n: PubSub.Notification) => {
    setState({ typeList: n.body });
  });
  subscriber.on('projectCreateInfo', (n: PubSub.Notification) => {
    setState({ projectSimple: n.body });
    setState({ projectDetailDrawerVisible: true });
  });
  subscriber.start();

  return (
    <div>
      <Filter
        subscriber={subscriber}
        onChangeFilter={(filter) => {
          setState({
            filter,
          });
        }}
      />

      <List
        dataSource={projectsState.value?.filter(state.filter)}
        renderItem={(item) => (
          <ProjectCard
            key={item.ProjectID}
            ProjectName={item.ProjectName}
            ProjectDescription={item.ProjectDescription}
            PositionNames={item.PositionNames}
            CreatorName={item.CreatorName}
            CreatorSchool={item.CreatorSchool}
            onClick={() => {
              setState({
                projectSimple: item,
                projectDetailDrawerVisible: true,
              });
            }}
          />
        )}
      >
        {' '}
      </List>

      <Drawer
        destroyOnClose
        closeIcon={<DownOutlined />}
        onClose={() => {
          setState({
            projectDetailDrawerVisible: false,
          });
        }}
        visible={state.projectDetailDrawerVisible}
        height="100%"
        width="100%"
        bodyStyle={{ padding: '0' }}
        placement={'bottom'}
      >
        <ProjectDetail
          ProjectID={state.projectSimple.ProjectID}
          ProjectName={state.projectSimple.ProjectName}
          ProjectDescription={state.projectSimple.ProjectDescription}
          PositionNames={state.typeList.positionNames}
          CompetitionNames={state.typeList.competitionNames}
        />
      </Drawer>

      <Drawer
        destroyOnClose
        closeIcon={<RightOutlined />}
        onClose={() => {
          setState({
            createProjectDrawerVisible: false,
          });
        }}
        visible={state.createProjectDrawerVisible}
        width="100%"
        bodyStyle={{ padding: '0' }}
      >
        <CreateProject
          competitionNames={state.typeList.competitionNames}
          competitionTypes={state.typeList.competitionTypes}
          positionNames={state.typeList.positionNames}
          subscriber={subscriber}
        />
      </Drawer>
    </div>
  );
}

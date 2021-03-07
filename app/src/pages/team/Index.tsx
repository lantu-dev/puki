import { call, team } from '@/api-client';
import { ProjectSimple } from '@/api-client/team';
import { Drawer, List } from 'antd';
import { useAsync, useSetState } from 'react-use';
import Filter from './component/Filter';
import ProjectCard from './component/ProjectCard';
import ProjectDetail from './component/ProjectDetail';

export default function Index() {
  const [state, setState] = useSetState({
    filter: (projectSimple: ProjectSimple): boolean => true,
    drawerVisible: false,
    projectSimple: {} as ProjectSimple,
  });

  const projectsState = useAsync(async () => {
    let res = await call(team.ProjectService.GetProjectSimples, {
      ProjectID: [],
    });
    console.log(res);
    return res.ProjectSimples;
  });

  return (
    <div>
      <Filter
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
            onClick={() => {
              setState({
                projectSimple: item,
                drawerVisible: true,
              });
            }}
          />
        )}
      ></List>

      <Drawer
        destroyOnClose
        onClose={() => {
          setState({
            drawerVisible: false,
          });
        }}
        visible={state.drawerVisible}
        width="100%"
        bodyStyle={{ padding: '0' }}
      >
        <ProjectDetail {...state.projectSimple} />
      </Drawer>
    </div>
  );
}

import { call, team } from '@/api-client';
import { ProjectSimple } from '@/api-client/team';
import { Drawer } from 'antd';
import { useAsync, useAsyncFn, useMethods } from 'react-use';
import Filter from './component/Filter';
import ProjectCard from './component/ProjectCard';
import ProjectDetail from './component/ProjectDetail';

const initialState = {
  filter: (v: any) => {
    return true;
  },
  drawerVisible: false,
  projectSimple: {} as ProjectSimple,
};

function createMethods(state: typeof initialState) {
  return {
    changeFilter(filter: (v: any) => boolean) {
      return { ...state, filter };
    },
    openDrawer(projectSimple: ProjectSimple) {
      return { ...state, projectSimple, drawerVisible: true };
    },
    closeDrawer() {
      return { ...state, drawerVisible: false };
    },
  };
}

export default function Index() {
  const [state, methods] = useMethods(createMethods, initialState);

  const projectsIDState = useAsync(async () => {
    let res = await call(team.ProjectService.GetProjectID, {});
    console.log(res);
    return res;
  });

  const [projectsState, fetch] = useAsyncFn(async () => {
    let res = await call(team.ProjectService.GetProjectSimples, {
      ProjectID: [],
    });
    console.log(res);
    return res.ProjectSimples;
  });

  console.log(projectsState);

  useAsync(async () => {
    fetch();
  });

  return (
    <div>
      <Filter
        onChangeFilter={(filter) => {
          methods.changeFilter(filter);
        }}
      />

      {projectsState.value?.map((v) => (
        <div
          key={v.ProjectID}
          style={{
            marginTop: '15px',
            border: '1px solid #d9d9d9',
            padding: '10px',
            paddingRight: '5px',
          }}
          onClick={() => {
            methods.openDrawer(v);
          }}
        >
          <ProjectCard
            ProjectName={v.ProjectName}
            ProjectDescription={v.ProjectDescription}
            PositionNames={v.PositionNames}
          />
        </div>
      ))}

      <Drawer
        destroyOnClose
        onClose={methods.closeDrawer}
        visible={state.drawerVisible}
        width="100%"
        bodyStyle={{ padding: '0' }}
      >
        <ProjectDetail {...state.projectSimple} />
      </Drawer>
    </div>
  );
}

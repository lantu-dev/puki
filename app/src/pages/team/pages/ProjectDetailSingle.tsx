import team from '@/backend/team';
import auth from '@/backend/auth';
import { call } from '@/utils/client';
import style from '@/assets/team/css/expand.css';
import ProjectDetail from '@/pages/team/component/ProjectDetail';
import { useState } from 'react';
import { history } from 'umi';
import { useAsync } from 'react-use';
import { CloseOutlined } from '@ant-design/icons';

interface ProjectDetailSingleProps {
  location: {
    query: {
      ProjectID: string;
    };
  };
}

export default function ProjectDetailSingle(props: ProjectDetailSingleProps) {
  //根据项目ID获取：CompetitionNames，PositionNames，ProjectDescription，ProjectName
  const [projectSimpleState, setProjectSimpleState] = useState({
    competitionNames: [''],
    positionNames: [''],
    projectDescription: '',
    projectName: '',
  });

  useAsync(async () => {
    call(team.ProjectService.GetProjectSimple, {
      ProjectID: parseInt(props.location.query.ProjectID),
    }).then((r) => {
      setProjectSimpleState({
        competitionNames: r.ProjectSimple.CompetitionNames,
        positionNames: r.ProjectSimple.PositionNames,
        projectDescription: r.ProjectSimple.ProjectDescription,
        projectName: r.ProjectSimple.ProjectName,
      });
    });
  });

  return (
    <div>
      <div
        style={{ position: 'absolute', right: '10px', top: '5px' }}
        onClick={() => {
          history.push('/team');
        }}
      >
        <CloseOutlined />
      </div>
      <ProjectDetail
        ProjectID={parseInt(props.location.query.ProjectID)}
        ProjectName={projectSimpleState.projectName}
        ProjectDescription={projectSimpleState.projectDescription}
        PositionNames={projectSimpleState.positionNames}
        CompetitionNames={projectSimpleState.competitionNames}
      />
    </div>
  );
}

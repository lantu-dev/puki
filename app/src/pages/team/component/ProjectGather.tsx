import React from 'react';
import { call } from '@/api-client';
import ProjectCard from '@/pages/team/component/ProjectCard';
import style from '../../../assets/team/css/expand.css';

interface Project {
  ProjectID: number;
  CreateTime: string;
  UpdateTime: string;
  ProjectName: string;
  ProjectDescription: string;
  StarNum: number;
  CommentNum: number;
  CompetitionNames: string[];
  TypeName: string;
  PositionNames: string[];
}

interface ProjectGatherState {
  IsFinished: boolean;
  Projects: Project[];
}

interface GetProjectSimpleReq {}
interface GetProjectSimpleRes {
  ProjectSimples: Project[];
}

interface ProjectGatherProp {
  CompetitionName: string;
}

export default class ProjectGather extends React.Component {
  props: ProjectGatherProp = {
    CompetitionName: '',
  };
  state: ProjectGatherState = {
    IsFinished: false,
    Projects: [],
  };
  render() {
    call<GetProjectSimpleReq, GetProjectSimpleRes>(
      'ProjectService.GetProjectSimple',
      {},
    ).then((r) => {
      if (!this.state.IsFinished) {
        this.setState({
          IsFinished: true,
          Projects: r.ProjectSimples,
        });
      }
    });
    return (
      <div>
        {this.state.Projects.map((value) => (
          <div
            className={
              value.CompetitionNames.join(' ') +
              ' ' +
              value.TypeName +
              ' ' +
              value.PositionNames.join(' ')
            }
          >
            <ProjectCard
              ProjectID={value.ProjectID}
              ProjectName={value.ProjectName}
              ProjectDescribeSimple={value.ProjectDescription}
              PositionNames={value.PositionNames}
            />
          </div>
        ))}
      </div>
    );
  }
}

// {this.props.CompetitionName && !(this.props.CompetitionName === '所有比赛/活动')
//   ? this.state.Projects.map((value) => (
//     value.CompetitionNames ? value.CompetitionNames.map(value1 => (
//       value1 === this.props.CompetitionName?
//         <ProjectCard
//           ProjectID={value.ProjectID}
//           ProjectName={value.ProjectName}
//           ProjectDescribeSimple={value.ProjectDescription}
//         /> : false
//     )) : false
//   )) : this.state.Projects.map(value => (
//     <ProjectCard
//       ProjectID={value.ProjectID}
//       ProjectName={value.ProjectName}
//       ProjectDescribeSimple={value.ProjectDescription}
//     />
//   ))}

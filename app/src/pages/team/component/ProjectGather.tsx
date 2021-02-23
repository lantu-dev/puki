import React from 'react';
import {call} from "@/api-client";
import ProjectCard from "@/pages/team/component/ProjectCard";

interface Project {
  CreateTime:string
  UpdateTime:string
  ProjectName:string
  ProjectDescription:string
  StarNum:number
  CommentNum:number
}

interface ProjectGatherState{
  IsFinished:boolean
  Projects:Project[]
}

interface GetProjectSimpleReq {}
interface GetProjectSimpleRes {
  ProjectSimples:Project[]
}

export default class ProjectGather extends React.Component{
  state:ProjectGatherState = {
    IsFinished:false,
    Projects:[]
  }
  render() {
    console.log(this.state.Projects)
    call<GetProjectSimpleReq,GetProjectSimpleRes>("ProjectService.GetProjectSimple", {})
      .then(r => {
        if (!this.state.IsFinished){
          this.setState({
            IsFinished:true,
            Projects:r.ProjectSimples
          })
        }

      })
    return (
      <div>

        {this.state.Projects.map(value => (
          <ProjectCard ProjectName={value.ProjectName} ProjectDescribeSimple={value.ProjectDescription}/>
        ))}
      </div>
    );
  }
}

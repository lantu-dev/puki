import React, { useState, Suspense, useEffect, lazy } from 'react';
import { call, team } from '@/api-client';
import ProjectCard from '@/pages/team/component/ProjectCard';

interface ProjectGatherProps {
  competitionName: string;
  competitionType: string;
  positionName: string;
}

export default function ProjectGather(props: ProjectGatherProps) {
  //项目简介数组
  let [projectSimples, setProjectSimples] = useState([
    {
      ProjectID: 0,
      CreateTime: '',
      UpdateTime: '',
      ProjectName: '',
      ProjectDescription: '',
      StarNum: 0,
      CommentNum: 0,
      CompetitionNames: [''],
      TypeName: '',
      PositionNames: [''],
    },
  ]);
  //项目简介对象
  let [projectSimple, setProjectSimple] = useState({
    ProjectID: 0,
    CreateTime: '',
    UpdateTime: '',
    ProjectName: '',
    ProjectDescription: '',
    StarNum: 0,
    CommentNum: 0,
    CompetitionNames: [''],
    TypeName: '',
    PositionNames: [''],
  });
  //获取项目个数【即首屏卡片个数】
  let [projectNum, setProjectNum] = useState(0);
  //数据库中project的索引
  let [projectIndex, setProjectIndex] = useState(1);
  //目前成功获取的项目简介数量
  let [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    call(team.ProjectService.GetProjectNum, {}).then((r) => {
      setProjectNum(r.ProjectNum);
    });
  }, [1]);
  useEffect(() => {
    call(team.ProjectService.GetProjectSimple, {
      ProjectID: projectIndex,
    }).then((r) => {
      if (r.IsFound) {
        projectSimples.push(r.ProjectSimple);
        setProjectSimples(projectSimples);
        setProjectCount(projectCount + 1);
        setProjectIndex(projectIndex + 1);
      } else {
        if (projectCount < projectNum) {
          setProjectIndex(projectIndex + 1);
        }
      }
    });
  }, [projectIndex]);

  return (
    <div>
      {projectSimples
        .filter(
          (value) =>
            (value.CompetitionNames.includes(props.competitionName) ||
              props.competitionName === '') &&
            (value.TypeName === props.competitionType ||
              props.competitionType === '所有类别' ||
              props.competitionType === '') &&
            (value.PositionNames.includes(props.positionName) ||
              props.positionName === '' ||
              props.positionName === '所有岗位') &&
            value.ProjectID != 0,
        )
        .map((value, index) => (
          <div key={index}>
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

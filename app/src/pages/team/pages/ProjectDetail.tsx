import React from 'react';

interface ProjectDetailProps {
  location: {
    state: {
      ProjectID: number;
    };
  };
}
export default function ProjectDetail(props: ProjectDetailProps) {
  console.log(props.location.state.ProjectID);
  return <div></div>;
}

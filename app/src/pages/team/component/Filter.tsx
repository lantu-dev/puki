import { call, team } from '@/api-client';
import { ProjectSimple } from '@/api-client/team';
import logo from '@/assets/team/img/logo.png';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Space } from 'antd';
import _ from 'lodash';
import { useAsync, useSetState } from 'react-use';
import { Link } from 'umi';
const { Search } = Input;
interface FilterProps {
  onChangeFilter: (filter: (v: ProjectSimple) => boolean) => void;
}

export default function Filter(props: FilterProps) {
  const [state, setState] = useSetState({
    searchValue: '',
    competitionName: 'all',
    competitionType: 'all',
    positionName: 'all',
  });

  const typeListState = useAsync(async () => {
    return {
      competitionNames: (
        await call(team.CompetitionService.GetCompetitionNames, {})
      ).CompetitionNames,
      competitionTypes: (
        await call(team.CompetitionService.GetCompetitionTypes, {})
      ).CompetitionTypes,
      positionNames: (await call(team.PositionService.GetPositionNames, {}))
        .PositionNames,
    };
  });

  const {
    value: { competitionNames, competitionTypes, positionNames } = {
      competitionNames: [],
      competitionTypes: [],
      positionNames: [],
    },
  } = typeListState;

  const handler = (fields: typeof state) => {
    setState(fields);

    const {
      searchValue,
      competitionName,
      competitionType,
      positionName,
    } = fields;

    props.onChangeFilter((projectSimple: ProjectSimple) => {
      const reg = new RegExp(searchValue.replace('\\', '\\\\'), 'gi');
      const searchMatch =
        reg.test(projectSimple.ProjectName) ||
        reg.test(projectSimple.ProjectDescription);

      const nameMatch =
        competitionName === 'all' ||
        _.indexOf(projectSimple.CompetitionNames, competitionName) >= 0;

      const typeMatch =
        competitionType === 'all' || projectSimple.TypeName === competitionType;

      const positionMatch =
        positionName === 'all' ||
        _.indexOf(projectSimple.PositionNames, positionName) >= 0;

      console.log(
        projectSimple.ProjectID,
        searchMatch,
        competitionName,
        competitionType,
        positionName,
      );

      return searchMatch && nameMatch && positionMatch && typeMatch;
    });
  };

  const onSearchChange = (searchValue: string) => {
    const fields = { ...state, searchValue };
    handler(fields);
  };

  const onCompetitionNameChange = (competitionName: string) => {
    const fields = { ...state, competitionName };
    handler(fields);
  };

  const onCompetitionTypeChange = (competitionType: string) => {
    const fields = { ...state, competitionType };
    handler(fields);
  };

  const onPositionChange = (positionName: string) => {
    const fields = { ...state, positionName };
    handler(fields);
  };

  return (
    <div>
      <Row align="middle">
        <Col flex="50px">
          <Link to="team">
            <img alt={logo} width="50" src={logo} />
          </Link>
        </Col>
        <Col flex="auto">
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Space direction="vertical" style={{ width: '98%' }}>
              <Search
                placeholder="请输入关键词查询"
                onSearch={onSearchChange}
                size="large"
                style={{ width: '100%' }}
              />
            </Space>
          </div>
        </Col>
        <Col flex="30px" style={{ textAlign: 'right' }}>
          <PlusCircleOutlined style={{ fontSize: 30, color: 'black' }} />
        </Col>
      </Row>
      <Row justify="space-around" style={{ marginTop: '7px' }} wrap={false}>
        {/*按比赛/活动筛选*/}
        <Col span={7}>
          <Select
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            loading={typeListState.loading}
            onChange={onCompetitionNameChange}
            options={[
              { label: '全部比赛/活动', value: 'all' },
              ...competitionNames.map((v) => ({
                label: v,
                value: v,
              })),
            ]}
            placeholder="按比赛"
          />
        </Col>
        {/*按比赛/活动类别筛选*/}
        <Col span={7}>
          <Select
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            loading={typeListState.loading}
            onChange={onCompetitionTypeChange}
            options={[
              { label: '全部类别', value: 'all' },
              ...competitionTypes.map((v) => ({
                label: v,
                value: v,
              })),
            ]}
            placeholder="按类别"
          />
        </Col>
        {/*按岗位筛选*/}
        <Col span={7}>
          <Select
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            loading={typeListState.loading}
            onChange={onPositionChange}
            options={[
              { label: '全部岗位', value: 'all' },
              ...positionNames.map((v) => ({
                label: v,
                value: v,
              })),
            ]}
            placeholder="按岗位"
          />
        </Col>
      </Row>
    </div>
  );
}

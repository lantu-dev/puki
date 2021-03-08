import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: '产品部',
    description: (
      <>
        产品部成立于2019年3月，旨在提高在岗人员产品设计方面的技能、深入了解用户体验以提高产品特性、对接客户期望产品特性、以及提供产品设计方面的人员支持。
        产品部是蓝图的核心——作为用户与研发的枢纽，我们的工作是产品从无到有的关键一环；作为信息传播交流的窗口，“北邮蓝图”的公众号由我们运营。
      </>
    ),
  },
  {
    title: '研发部',
    description: (
      <>
        蓝图研发部由长顺科技扶贫项目技术团队发展而来，是蓝图创新协会的技术担当。
        作为蓝图创新协会的技术核心，我们将会承担蓝图所有项目的实际开发工作以及对外的技术宣讲工作。
      </>
    ),
  },
  {
    title: '竞赛实践部',
    description: (
      <>
        竞赛实践部主要负责校内外各种相关竞赛的组织与宣传工作及暑期实践的管理。工作内容主要包括大小竞赛的组织策划安排、部分竞赛的设计级，通知传达、报名信息收集及统计整理，暑期社会实践的人员统计、事件策划及跟踪等。
      </>
    ),
  },
  {
    title: '成果深化中心',
    description: (
      <>
        成果深化中心主要负责各种科技实践项目中成果深化知识方面的宣传与普及。工作内容主要包括指导并协助计算机院学生发明专利，实用新型专利及软件著作权申请办理，开展关于成果深化相关的讲座与培训，以及蓝图内项目的成果深化工作。
      </>
    ),
  },
  {
    title: '运营部',
    description: (
      <>
        运营部为蓝图新成立部门，旨在保证蓝图各项活动的顺利开展与执行。在蓝图新一年的工作计划中，各项活动的组织与开展为主要工作内容，故而运营部具有极其重要的地位。
        运营部主要负责组织活动的工作。蓝图将在新学期开展各类活动，包括技术沙龙、讲座、小型竞赛等。运营部是各项活动能否顺利开展的关键。
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`欢迎来到 ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/about/')}>
              了解更多
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;

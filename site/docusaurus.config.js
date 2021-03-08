module.exports = {
  title: '北邮蓝图',
  tagline: '北京邮电大学蓝图创新工作室(计算机学院蓝图创新协会、计算机学院团委科创实践部)',
  url: 'https://stagging.blueprint.org.cn/',
  baseUrl: 'CI_BUILED_BASEURL',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lantu-dev', // Usually your GitHub org/user name.
  projectName: 'puki', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '蓝图',
      logo: {
        alt: '蓝图主页',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: '首页',
          position: 'left',
        },
        {to: 'awards', label: '荣誉', position: 'left'},
        {to: 'blog', label: '知识分享', position: 'left'},
        {to: 'news', label: '新闻', position: 'left'},
        {to: 'summary', lable: '总结', position: 'left'},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '产品',
          items: [
            {
              label: '产品介绍',
              to: 'docs/doc3/',
            },
            {
              label: '产品服务',
              to: 'docs/doc3/',
            },
          ],
        },
        {
          title: '企业介绍',
          items: [
            {
              label: '关于我们',
              to: 'docs/about',
            },
            {
              label: '社区',
              href: 'https://example.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '加入我们',
              to: 'docs/join',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lantu-dev',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 版权所有`,
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        path: 'news',
        routeBasePath: 'news',
        id: 'plugin-content-blog-news',
        include: ['*.md', '*.mdx'],
        // ...
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        path: 'awards',
        routeBasePath: 'awards',
        id: 'plugin-content-blog-awards',
        include: ['*.md', '*.mdx'],
        // ...
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        path: 'summary',
        routeBasePath: 'summary',
        id: 'plugin-content-blog-summary',
        include: ['*.md', '*.mdx'],
        // ...
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

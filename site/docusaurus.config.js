module.exports = {
  title: '蓝图主页',
  tagline: 'The tagline of my site',
  url: 'https://stagging.blueprint.org.cn/',
  baseUrl: 'CI_BUILED_BASEURL',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lantu-dev', // Usually your GitHub org/user name.
  projectName: 'puki', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '蓝图主页',
      logo: {
        alt: '蓝图主页',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: '首页',
          position: 'right',
        },
        {to: 'blog', label: '关于我们', position: 'right'},
        {

        }
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
              to: 'docs/',
            },
            {
              label: '产品服务',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: '企业介绍',
          items: [
            {
              label: '关于我们',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: '社区',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 版权所有`,
    },
  },
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

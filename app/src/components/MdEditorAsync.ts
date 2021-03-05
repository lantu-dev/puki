import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const { MdEditor } = await import(
      /* webpackChunkName: "MdEditor" */ './MdEditor'
    );
    return MdEditor;
  },
});

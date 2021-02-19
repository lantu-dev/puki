# Config文件夹

> 用于进行各项配置

### config.ts

常见配置如下：

```typescript
export default {
  base: '/docs/',
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'hash',
  },
}
```

一般来说，只有当配置比较复杂的时候，才需要将配置写在`config/config.ts`中，如果配置不复杂，推荐在`.umirc.ts`中。对于对于复杂情况，可将配置的一部分拆分出去，如路由配置可拆分成**route.ts**

关于UmiJS配置的更多资料，见文档：https://umijs.org/zh-CN/config#nodemodulestransform

### route.ts

```typescript
export default [
    {exact: true, path: '/', component: 'index'},
]
```

### 使用TypeScript提示

如果你想在写配置时也有提示，可以通过 umi 的 `defineConfig` 方法定义配置，

```js
import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
```
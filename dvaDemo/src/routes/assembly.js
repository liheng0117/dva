import dynamic from 'dva/dynamic'

const app = window.app;

const Home = dynamic({
  app,
  models: () => [import("@/models/home")],
  component: () => import("@/pages/home"),
});

export { Home };
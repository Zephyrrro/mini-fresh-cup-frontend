import AdminLayout from '../pages/Admin';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Answer from '../pages/Answer';
import Notice from '../pages/Notice';
import EditQuestion from '../pages/Admin/Question/EditQuesion';
import AddQuestion from '../pages/Admin/Question/AddQuestion';
import EditNotice from '../pages/Admin/Notice/EditNotice';

const commonRouterConfig = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/answer',
    component: Answer,
    exact: true,
  },
  {
    path: '/notice/view',
    component: Notice,
    exact: true,
  },
];

const adminRouterConfig = [
  {
    path: '/admin',
    component: AdminLayout,
    routes: [
      {
        path: '/question/add',
        component: EditQuestion,
        exact: true,
      },
      {
        path: '/question/view',
        component: AddQuestion,
        exact: true,
      },
      {
        path: '/notice/edit',
        component: EditNotice,
        exact: true,
      },
    ],
  },
];
const routerConfig = [...commonRouterConfig, ...adminRouterConfig];

export { commonRouterConfig, adminRouterConfig };
export default routerConfig;

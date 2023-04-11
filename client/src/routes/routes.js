import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Products from '~/pages/Products';
import Dashboard from '~/pages/Dashboard';
import Groups from '~/pages/Groups';
import Marketplace from '~/pages/Marketplace';
import Settings from '~/pages/Settings';
import Profile from '~/pages/Profile';
import Chat from '~/pages/Chat';

//publicRoutes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.products, component: Products },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.groups, component: Groups },
    { path: config.routes.marketplace, component: Marketplace },
    { path: config.routes.settings, component: Settings },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.chat, component: Chat },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

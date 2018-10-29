import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MainServerWatcher from './views/side-page-sub/MainServerWatcher.vue';
import ServerWatcher from './views/side-page-sub/ServerWatcher.vue';
import AddServerWatcher from './views/side-page-sub/AddServerWatcher.vue';
import Setting from './views/Setting.vue';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/Setting',
            name: 'Setting',
            component: Setting
        }, {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/',
                    component: MainServerWatcher
                }, {
                    path: 'MainServerWatcher',
                    component: MainServerWatcher
                }, {
                    path: 'Server:id',
                    component: ServerWatcher
                }, {
                    path: 'AddServerWatcher',
                    component: AddServerWatcher
                }
            ]
        }
    ]
});
//# sourceMappingURL=router.js.map
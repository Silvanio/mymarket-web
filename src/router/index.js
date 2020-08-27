import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/Home.vue'
import Login from '../views/pages/Login.vue'
import EmptyPage from "../views/pages/EmptyPage";
import Base from "../views/template/Base";
import AuthStorage from '../utils/auth-storage';
import MyAccount from "../views/pages/MyAccount";
import StockConsult from "../views/pages/stock/StockConsult";
import StockCreate from "../views/pages/stock/StockCreate";
import ProductConsult from "../views/pages/product/ProductConsult";
import ProductCreate from "../views/pages/product/ProductCreate";
import SectorConsult from "../views/pages/sector/SectorConsult";
import SectorCreate from "../views/pages/sector/SectorCreate";
import SubSectorConsult from "../views/pages/sub-sector/SubSectorConsult";
import SubSectorCreate from "../views/pages/sub-sector/SubSectorCreate";
import SegmentCreate from "../views/pages/segment/SegmentCreate";
import SegmentConsult from "../views/pages/segment/SegmentConsult";
import BrokerConsult from "../views/pages/broker/BrokerConsult";
import BrokerCreate from "../views/pages/broker/BrokerCreate";
import ImportFile from "../views/pages/import-file/ImportFile";
import Sync from "../views/pages/sync/Sync";
import TrackMarket from "@/views/pages/track-market/TrackMarket";


const ifNotAuthenticated = (to, from, next) => {
    const accessToken = AuthStorage.getStorage("access_token");
    if (accessToken) {
        next("/empty")
    } else {
        next();
    }
}

const ifAuthenticated = (to, from, next) => {
    const accessToken = AuthStorage.getStorage("access_token");
    const isRoleOk = Vue.prototype.$authbus.isAuthorized(to.meta.role)
    if (accessToken && isRoleOk) {
        next()
    } else {
        next('/login');
    }

}

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        component: Base,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_USER", "MY_MARKET_ADMIN"]}
            },
            {
                path: 'empty',
                name: 'Empty',
                component: EmptyPage,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_USER", "MY_MARKET_ADMIN"]}
            },
            {
                path: 'account',
                name: 'Account',
                component: MyAccount,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_USER", "MY_MARKET_ADMIN"]}

            }

        ]
    },
    {
        path: '/stock',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'StockConsult',
                component: StockConsult,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}

            },
            {
                path: 'create',
                name: 'StockCreate',
                component: StockCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}

            },
            {
                path: 'update/:id',
                name: 'StockUpdate',
                component: StockCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/product',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'ProductConsult',
                component: ProductConsult,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}

            },
            {
                path: 'create',
                name: 'ProductCreate',
                component: ProductCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}

            },
            {
                path: 'update/:id',
                name: 'ProductUpdate',
                component: ProductCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/sector',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'SectorConsult',
                component: SectorConsult,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'create',
                name: 'SectorCreate',
                component: SectorCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'SectorUpdate',
                component: SectorCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/sub-sector',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'SubSectorConsult',
                component: SubSectorConsult,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'create',
                name: 'SubSectorCreate',
                component: SubSectorCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'SubSectorUpdate',
                component: SubSectorCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/segment',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'SegmentConsult',
                component: SegmentConsult,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'create',
                name: 'SegmentCreate',
                component: SegmentCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'SegmentUpdate',
                component: SegmentCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/broker',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'BrokerConsult',
                component: BrokerConsult,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'create',
                name: 'BrokerCreate',
                component: BrokerCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'BrokerUpdate',
                component: BrokerCreate,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/import-file',
        component: Base,
        children: [
            {
                path: '',
                name: 'ImportFile',
                component: ImportFile,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
        ]
    },
    {
        path: '/sync-data',
        component: Base,
        children: [
            {
                path: '',
                name: 'SyncData',
                component: Sync,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN"]}
            },
        ]
    },
    {
        path: '/track-market',
        component: Base,
        children: [
            {
                path: '',
                name: 'TrackMarket',
                component: TrackMarket,
                beforeEnter: ifAuthenticated,
                meta: {role: ["MY_MARKET_ADMIN","MY_MARKET_USER"]}
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

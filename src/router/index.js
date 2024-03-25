import { createWebHistory, createRouter } from 'vue-router';
//상대 경로로 진행해야할듯 오류 뜸
import BoardList from '../components/BoardList.vue';
import BoardDetail from '../components/BoardDetail.vue';
import BoardWrite from '../components/BoardWrite.vue';

//Vue3 기준
const routes = [
    {
        path: '/',
        name: 'BoardList',
        component: BoardList,
    },
    {
        path: '/boardDetail',
        name: 'BoardDetail',
        component: BoardDetail,
    },
    {
        path: '/boardWrite',
        name: 'BoardWrite',
        component: BoardWrite,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;

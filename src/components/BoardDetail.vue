<template>
    <div id="detail" class="center">
        <div class="boardCon center">
            <h1>
                {{ boardDetail.title }}
            </h1>
            <span>{{ boardDetail.userNm }}</span>
            <p>{{ boardDetail.content }}</p>
        </div>
        <div class="btnList">
            <button @click="mvList">목록</button>
            <button @click="delBoard">삭제</button>
            <button @click="mvupdate(this.seq)">수정</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import router from '@/router';
import store from '@/store';

export default {
    name: 'BoardDetail',
    data() {
        return { boardDetail: {}, seq: this.$route.query.seq };
    },
    created() {
        this.getData();
        store.commit('changeRefresh', 'N');
    },
    methods: {
        async getData() {
            this.boardDetail = await axios
                .post('http://localhost:8081/board/selectBoardDetail', {
                    seq: this.seq,
                })
                .then((res) => {
                    return res.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        mvList() {
            router.push('/');
        },
        mvupdate(seq) {
            router.push('boardWrite?seq=' + seq);
        },
        delBoard() {
            try {
                axios
                    .post('http://localhost:8081/board/mergeBoard', {
                        seq: this.$route.query.seq,
                        delYn: 'Y',
                    })
                    .then((res) => {
                        if (res.data > 0) {
                            if (!alert('삭제가 완료되었습니다.')) {
                                store.commit('changeRefresh', 'Y');
                                router.push('/');
                            } else {
                                alert('오류가 발생하였습니다.');
                            }
                        }
                    });
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../assets/common.scss';
</style>

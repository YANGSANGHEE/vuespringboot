<template>
    <div id="write" class="center">
        <div class="boardCon center center-left">
            <div class="center-row">
                <span>작성자</span>
                <input type="text" v-model="boardData.userId" />
            </div>
            <div class="center-row">
                <span>작성자명</span>
                <input type="text" v-model="boardData.userNm" />
            </div>
            <div class="center-row">
                <span>제목</span>
                <input type="text" v-model="boardData.title" />
            </div>
            <div class="center-row">
                <span>내용</span>
                <textarea v-model="boardData.content"></textarea>
            </div>
            <div class="center-row">
                <div class="btnWrap">
                    <button @click="sendData">
                        {{
                            this.getseq != null && this.getseq != ''
                                ? '수정'
                                : '작성'
                        }}
                    </button>
                    <button @click="$router.push({ name: 'BoardList' })">
                        목록
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import router from '@/router';
import store from '@/store';

export default {
    name: 'BoardWrite',
    data() {
        return {
            boardDetail: {},
            getseq: this.$route.query.seq,
            boardData: {
                title: '',
                userId: '',
                userNm: '',
                content: '',
            },
        };
    },
    created() {
        store.commit('changeRefresh', 'N');
        if (this.getseq > 0) {
            this.getData();
        }
    },
    methods: {
        async sendData() {
            let content = this.boardData['content'];
            let title = this.boardData['title'];
            let userId = this.boardData['userId'];
            let userNm = this.boardData['userNm'];

            if (content == null || content == '') {
                alert('내용을 입력해주세요');
                return false;
            } else if (title == null || title == '') {
                alert('제목을 입력해주세요');
                return false;
            } else if (userId == null || userId == '') {
                alert('작성자를 입력해주세요');
                return false;
            } else if (userNm == null || userNm == '') {
                alert('작성자명을 입력해주세요');
                return false;
            }
            await axios
                .post('http://localhost:8081/board/mergeBoard', {
                    seq: this.getseq,
                    content: content,
                    title: title,
                    userId: userId,
                    userNm: userNm,
                })
                .then((res) => {
                    if (res.data > 0) {
                        if (!alert('작성이 완료되었습니다')) {
                            store.commit('changeRefresh', 'Y');
                            router.push('/');
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        async getData() {
            await axios
                .post('http://localhost:8081/board/selectBoardDetail', {
                    seq: this.getseq,
                })
                .then((res) => {
                    this.boardData['title'] = res.data.title;
                    this.boardData['content'] = res.data.content;
                    this.boardData['userId'] = res.data.userId;
                    this.boardData['userNm'] = res.data.userNm;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
<style lang="scss">
@import '../assets/common.scss';
</style>

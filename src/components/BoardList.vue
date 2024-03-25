<template>
    <div id="root">
        <div class="board">
            <div class="searchInput">
                <input v-model="title" type="text" />
                <button @click="getData()">검색</button>
            </div>
            <div class="boardTitle centering">
                <span>제목</span>
                <span>작성자</span>
                <span>등록일</span>
            </div>
            <div class="boardCon">
                <div v-for="(bVal, bidx) in boardData" :key="bidx">
                    <div @click="mvDetail(bVal && bVal.seq)">
                        <p>{{ bVal && bVal.title }}</p>
                        <p>{{ bVal && bVal.userNm }}</p>
                        <p>{{ bVal && bVal.regDt }}</p>
                    </div>
                </div>
            </div>
            <div class="pageNataion">
                <div class="paging">
                    <span
                        v-for="(val, idx) in pageArr"
                        :key="idx"
                        class="pagingNum"
                        :class="{ pageactive: val == this.page }"
                        @click="getData(val)"
                        >{{ val }}</span
                    >
                    <button @click="$router.push({ name: 'BoardWrite' })">
                        글작성
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
//useRouter가 아닌 router 폴더를 직접 import 해줘야함
import router from '@/router';
import store from '@/store';

export default {
    name: 'BoardList',
    //실시간 렌더링
    data() {
        return {
            boardData: [],
            allPageCnt: 0,
            page: 1,
            pageArr: [],
            refresh: store.state.refresh,
            title: '',
        };
    },
    created() {
        this.getData();
    },
    //useEffect역할
    watch: {
        //delYn이 변경될 경우 데이터를 다시 불러온다.
        refresh: function () {
            this.getData();
        },

        allPageCnt: function () {
            const cnt = Math.ceil(this.allPageCnt / 10);
            this.pageArr = [];
            if (this.allPageCnt < 10) {
                this.pageArr.push(1);
            } else {
                for (let i = 1; i < cnt; i++) {
                    this.pageArr.push(i);
                }
            }
        },
    },
    methods: {
        async getData(val) {
            if (val != null && val != '') {
                this.page = val;
            }
            this.boardData = await axios
                .post('http://localhost:8084/board/selectBoardList', {
                    pageOffset: val != null && val != '' ? val : 0,
                    keyword: this.title != null && val != '' ? this.title : '',
                })
                .then((res) => {
                    this.allPageCnt = res.data.allCnt;
                    return res.data.boardList;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        mvDetail(idx) {
            router.push('boardDetail?seq=' + idx);
        },
    },
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#root {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modals {
    display: none;
}
.modals.active {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.centering {
    display: flex;
    padding: 0 50px;
    justify-content: space-between;
}
.board {
    width: 80vw;
    padding: 50px 0;
}
.boardTitle {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background: cadetblue;
}
.boardTitle span {
    font-size: 1.3rem;
    color: white;
    line-height: 50px;
    vertical-align: middle;
}
.boardCon {
    width: 100%;
    margin-bottom: 20px;
}
.boardCon div {
    width: 100%;
    height: 50px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    border-bottom: 1px solid cadetblue;
}
.boardCon div p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.boardCon div:hover {
    background: coral;
    cursor: pointer;
}
.boardCon div:hover p {
    color: white;
}
.boardCon div p {
    width: 200px;
    font-size: 1.3rem;
    line-height: 50px;
    vertical-align: middle;
    text-align: center;
}
.pageNataion {
    display: flex;
}
.pageNataion .paging {
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.pagingNum {
    display: block;
    width: 45px;
    height: 45px;
    line-height: 45px;
    border: 1px solid cadetblue;
    cursor: pointer;
    text-align: center;
    margin-right: 8px;
}
.pagingNum.pageactive {
    background: cadetblue;
    color: white;
}
button {
    background: cadetblue;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    width: 150px;
    height: 45px;
}
button:hover {
    background: none;
    border: 1px solid cadetblue;
    color: cadetblue;
    cursor: pointer;
}
.searchInput {
    width: 40%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}
.searchInput input[type='text'] {
    width: inherit;
    height: 40px;
    margin-right: 20px;
}
</style>

<template>
    <div class="utils-container">
        <div class="search-container">
            <!--            <h3>github项目</h3>-->
            <!--            <div class="git-container">-->
            <!--                <div class="item">-->
            <!--                    <h4 class="title">购物街</h4>-->
            <!--                    <p>git地址: <a href="https://github.com/lovebabyqi/shoppingStreet" target="_blank">https://github.com/lovebabyqi/shoppingStreet</a>-->
            <!--                    </p>-->
            <!--                    <p>项目介绍:基于Vue全家桶开发的移动端购物街商城</p>-->
            <!--                </div>-->
            <!--                <div class="item">-->
            <!--                    <h4 class="title">pos收银系统</h4>-->
            <!--                    <p>git地址: <a href="https://github.com/lovebabyqi/Awesome-pos" target="_blank">https://github.com/lovebabyqi/Awesome-pos</a>-->
            <!--                    </p>-->
            <!--                    <p>项目介绍:个人开发,简单收银系统</p>-->
            <!--                </div>-->
            <!--                <div class="item">-->
            <!--                    <h4 class="title">小案例</h4>-->
            <!--                    <p>git地址: <a href="https://github.com/lovebabyqi/Components" target="_blank">https://github.com/lovebabyqi/Components</a>-->
            <!--                    </p>-->
            <!--                    <p>项目介绍:平时练手写过的东西会存到这里</p>-->
            <!--                </div>-->
            <!--            </div>-->
            <h3>github检索</h3>
            <div class="input-group">
                <input v-model="gitKeyword" @keyup.enter="searchGit" type="text" class="input"
                       placeholder="根据下方搜索条件,输入搜索关键字">
                <button class="lo-button" type="button" @click="searchGit">检索</button>
            </div>
            <h3>npm检索</h3>
            <div class="input-group">
                <input v-model="npmKeyword" @keyup.enter="searchNpm" type="text" class="input"
                       placeholder="输入搜索关键字,跳转npm，别问为啥，问就是快">
                <button class="lo-button" type="button" @click="searchNpm">检索</button>
            </div>
            <div class="desc-info">
                <img src="/docs/images/git01.jpg" alt="">
                <img src="/docs/images/git02.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    // import jsonp from 'jsonp';
    export default {
        name: "Utils",
        data() {
            return {
                gitKeyword: '',
                npmKeyword: ''
            }
        },
        methods: {
            searchGit() {
                const baseUrl = 'https://github.com/search?';
                let url = baseUrl + 'q=' + this.gitKeyword;
                window.open(url);
                this.gitKeyword = ''
            },
            searchNpm() {
                const baseUrl = 'https://www.npmjs.com/search?';
                let url = baseUrl + 'q=' + this.npmKeyword;
                window.open(url);
                this.npmKeyword = ''
            }
        }
    }
</script>

<style scoped>

    .git-container {
        display: flex;
        flex-direction: column;
    }

    .item {
        margin: 15px 0;
    }

    .title {
        color: #42B983;
        font-weight: bold;
    }

    p {
        margin: 8px 0;
    }
    .input-group{
        display:flex;
    }
    .search-container h3 {
        font-size: 20px;
        line-height: 20px;
        margin: 20px auto;
        font-weight: 600;
        color: hotpink;
        text-align: center;
    }

    .input {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        font-variant: tabular-nums;
        list-style: none;
        -webkit-font-feature-settings: 'tnum';
        font-feature-settings: 'tnum';
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        -webkit-transition: all .3s;
        transition: all .3s;
    }

    .input:focus {
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
        -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
        box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
    }

    .desc-info img {
        width: 100%;
        padding: 10px 20px;
    }

    .lo-button {
        display: inline-block;
        line-height: 9px;
        height:32px;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
</style>
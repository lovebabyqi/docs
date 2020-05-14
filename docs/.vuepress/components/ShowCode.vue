<!--这里写一些公共方法-->
<template>
    <div class="code-container">
        <div class="code-header s-border" @click="toggle">
            <span v-if="isActive==='show'">收起代码</span>
            <span v-else>展开代码</span>
            <img src="/docs/icon/jiantou.png" class="code-icon" :class="{active:isActive==='show'}"/>
        </div>
        <div :class="isActive +'-code-content'">
            <div v-show="isShow==='show'">
                <slot></slot>
                <!--代码块插槽-->
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ShowCode",
        data() {
            return {
                isActive: 'hide',//控制动画
                isShow:'hide',//控制display
            }
        },
        methods: {
            toggle() {
                //展开的时候,先show 再执行动画active
                if(this.isShow==='hide'){
                    this.isShow ='show';
                    this.isActive = 'show';
                }else{
                    //收起的时候保证动画执行完,再display:none
                    this.isActive = this.isActive==='show'?'hide':'show';
                    setTimeout(()=>{
                        this.isShow = this.isShow==='show'?'hide':'show';
                    },300)
                }

            }
        }
    }
</script>

<style scoped>
    .s-border {
        border: 1px solid #ebebeb;
        border-collapse: collapse;
    }
    .code-container {
        text-align: center;
        position: relative;
    }
    .code-header {
        height: 60px;
        line-height: 60px;
        color: #409eff;
        font-size: 16px;
        user-select: none;
        cursor: pointer;
    }
    .code-header:hover{
        background-color: #f9fafc;
    }
    .code-header .code-icon{
        width:16px;
        height:16px;
        transform:rotate(0) translateY(3px);
        transform-origin: center;
        transition: transform .3s;
    }
    .code-header .code-icon.active{
        transform:rotate(90deg) translateY(-1px);
    }

    @keyframes show-code {
        0% {
            opacity: .2;
            transform: scale(.6);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes hide-code {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .show-code-content{
        transform-origin: top;
        animation: show-code .3s;
    }
    .hide-code-content{
        position:absolute;
        width:100%;
        transform-origin: top center;
        animation: hide-code .3s;
    }

</style>
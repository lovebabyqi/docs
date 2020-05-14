<template>
    <div class="show-lo-toast mt-3">
        <lo-toast ref="lotoast"/>
        <button class="lo-button" @click="handleMessage('success','这是一条成功的消息')">成功</button>
        <button class="lo-button" @click="handleMessage('warn','这是一条警告的消息')">警告</button>
        <button class="lo-button" @click="handleMessage('info','这是一条普通的消息')">消息</button>
        <button class="lo-button" @click="handleMessage('danger','这是一条错误的消息')">错误</button>
    </div>
</template>

<script>
    import LoToast from "./LoToast";
    export default {
        name: "ShowLoToast",
        methods:{
            handleMessage(type,message){
                this.$refs.lotoast.show(type,message)
            }
        },
        components:{
            LoToast
        }
    }
</script>

<style>
    .lo-button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
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
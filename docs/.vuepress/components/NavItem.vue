<template>
    <div class="nav-item" :title="navInfo.title">
        <img class="nav-icon" :src="navInfo.icon" :alt="navInfo.title">
        <p class="nav-desc">{{navInfo.title}}</p>
    </div>
</template>

<script>
    export default {
        name: "NavItem",
        props:['navInfo']
    }
</script>

<style scoped>
    .nav-item{
        width: 112px;
        height: 96px;
        padding:6px 0 16px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .nav-icon{
        display:block;
        width:48px;
        height: 48px;
        border-radius: 50%;
        margin:0 auto;
    }
    .nav-desc{
        font-size:12px;
        line-height:16px;
        text-align: center !important;/*覆盖styles中指定的p标签首行缩进样式*/
        padding:0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        text-indent: 0 !important;
    }
</style>
<template>
    <div class="toast-container" v-show="isShow">
        <div class='lo-toast' :class='activeClass'>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name:'LoToast',
        data() {
            return {
                isShow: false,
                message: '',
                activeClass: '',
                pre:0
            }
        },
        methods: {
            show(type, message, time = 2000) {
                let nowTime = Date.now();
                if(nowTime-this.pre<2000){
                    return false;
                }else{
                    this.isShow = true;
                    this.message = message;
                    this.activeClass = 'lo-toast-' + type
                    this.pre = nowTime;
                    setTimeout(() => {
                        this.isShow = false;
                        this.message = '';
                        this.activeClass = '';
                    }, time)
                }
            }
        }
    }
</script>

<style scoped>
    .toast-container{
        background-color: #edf2fc;
        animation:toast-animation 2s;
        min-width: 380px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        position: fixed;
        left: 50%;
        top: 150px;
        font-size: 14px;
        color: #fff;
        overflow: hidden;
    }
    .lo-toast {
        padding: 15px 15px 15px 30px;
    }
    @keyframes toast-animation {
        0%{
            opacity:1;
            transform:translateY(-100px);
        }15%{
             opacity:1;
             transform:translateY(0);
         }85%{
              opacity:1;
              transform:translateY(0);
          }100%{
               opacity: .8;
               transform: translateY(-100px);
           }
    }
    .lo-toast-success {
        background: url("/docs/icon/success.png") no-repeat;
        background-size: 24px 24px;
        background-position: 2px 15px;
        color:rgb(103, 194, 58);
        background-color: rgba(103, 194, 58,.4);
    }

    .lo-toast-warn {
        background: url("/docs/icon/warn.png") no-repeat;
        background-size: 24px 24px;
        background-position: 2px 15px;
        color:rgb(230, 162, 60);
        background-color: rgba(230, 162, 60,.4);
    }

    .lo-toast-danger {
        background: url("/docs/icon/danger.png") no-repeat;
        background-size: 24px 24px;
        background-position: 2px 15px;
        color:rgb(245, 108, 108);
        background-color: rgba(245, 108, 108,.4);
    }

    .lo-toast-info {
        background: url("/docs/icon/info.png") no-repeat;
        background-size: 24px 24px;
        background-position: 2px 15px;
        color:rgb(144, 147, 153);
        background-color: rgba(144, 147, 153,.4);
    }
</style>
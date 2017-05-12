<template>
    <div class="rule-step"> 
        <div v-for="(index,n) in datas" class="pr" :class="{'active':showstep==index}">
            <!-- {{index+1}}.{{n}} -->
            {{n}}
        </div>
    </div>
</template>
<style lang="scss">
.rule-step{
    display: table;  width: 100%;  padding: 0 40px;
    overflow: hidden;  box-sizing: border-box;
    .pr{
        position: relative;
        width: 25%;
        display: table-cell;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        text-align: center;
        border-bottom: 3px solid #f0f0f0;
        color: #999999;
    }
    .pr.active{
        border-bottom: 3px solid #e76b5f;
        color: #e76b5f;
    }
    .triangle-right {
        position: absolute;
        z-index: 2;
        top:0;
        right:-25px;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 25px solid #ddd;
        border-bottom: 25px solid transparent;
    }
    .triangle-right-white {
        position: absolute;
        z-index: 3;
        right: -24px;
        width: 0;
        height: 0;
        border-top: 24px solid transparent;
        border-left: 25px solid #fff;
        border-bottom: 24px solid transparent;
        top: 1px;
    }
    .triangle-right.active{
        border-left: 26px solid #2196F3;
        border-top: 26px solid transparent;
        border-bottom: 26px solid transparent;
        right: -27px;
    }
}
</style>
<script>
    export default{
        props:{
            datas:{type:Array,require:true},
            showstep:{type:Number}
        },
        data(){
            return{
            }
        },
        ready(){
        }
    }
</script>

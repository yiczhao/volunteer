<template>
    <div class="include-area">
    </div>
    <div class="home">
        <div class="total-div">
            <div class="total left">
                <span>{{total.allUser}}</span>
                <span>用户总数量</span>
            </div>
            <div class="total center">
                    <span>{{total.regitUser}}</span>
                    <span>今日注册数量</span>
            </div>
            <div class="total right">
                <span>{{total.loginUser}}</span>
                <span>今日活跃量</span>
            </div>
        </div>
        <div class="top-ten">
            <div>
                <h4>地区用户量排行榜</h4>
                <ul>
                    <li v-for="n in userTopTen">
                        <span>{{$index + 1 }}</span>
                        <span>{{n.topName | substring 15}}</span>
                        <span><i>{{n.topValue}}</i>人</span>
                    </li>
                </ul>
            </div>
            <div>
                <h4>地区注册量排行榜</h4>
                <ul>
                    <li v-for="n in regitTopTen">
                        <span>{{$index + 1 }}</span>
                        <span>{{n.topName | substring 15}}</span>
                        <span><i>{{n.topValue}}</i>人</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../ajax/common/home_model'
    export default{
        data(){
            this.model=model(this);
            return{
                total:{
                    allUser:'',
                    regitUser:'',
                    loginUser:'',
                },
                userTopTen:[],
                regitTopTen:[]
            }
        },
        methods:{
            getList(){
                this.model.getUserTotal().then((res)=>{
                    if(res.data.code===0){
                        this.$set('total',res.data.data);
                    }
                });
                this.model.getUserTop().then((res)=>{
                    if(res.data.code===0){
                        this.$set('userTopTen',res.data.data.userTopTen.sort((a,b)=>{return b['topValue']-a['topValue']}));
                        this.$set('regitTopTen',res.data.data.regitTopTen.sort((a,b)=>{return b['topValue']-a['topValue']}));
                    }
                });
            }
        },
        created(){
            this.getList();
        }
    }
</script>
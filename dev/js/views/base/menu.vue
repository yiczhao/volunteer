<template>
    <div class="menu">
        <ul class="menu-first">
            <li><a v-link="{name:'home'}"><i class="icon icon-home"></i>首页</a></li>
            <li>
                <span @click="changeShow(0)">
                    <i class="icon iconfont">&#xe647;</i>卡类活动
                    <i class="icon iconfont showbtn" v-show="!showUl[0].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[0].isshow">&#xe620;</i>
                </span>
                <ul v-show="showUl[0].isshow">
                    <template v-for="n in menuLists">
                        <li v-if="n.type==1"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
                </ul>
            </li>
            <li class="color999">
                <span @click="changeShow(1)">
                    <i class="icon iconfont">&#xe647;</i>券码活动
                    <i class="icon iconfont showbtn" v-show="!showUl[1].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[1].isshow">&#xe620;</i>
                </span>
                <ul v-show="showUl[1].isshow">
                    <template v-for="n in menuLists">
                        <li @click="waiting" v-if="n.type==2"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
                </ul>
            </li>
            <li>
                <span @click="changeShow(2)">
                    <i class="icon iconfont">&#xe64b;</i>查询
                    <i class="icon iconfont showbtn" v-show="!showUl[2].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[2].isshow">&#xe620;</i>
                </span>
                <ul v-show="showUl[2].isshow">
                    <template  v-for="n in menuLists">
                        <li v-if="n.type==3"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
                </ul>
            </li>
            <li class="color999">
                <span @click="changeShow(3)">
                    <i class="icon iconfont">&#xe64b;</i>终端管理
                    <i class="icon iconfont showbtn" v-show="!showUl[3].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[3].isshow">&#xe620;</i>
                </span>
                <ul v-show="showUl[3].isshow">
                    <template  v-for="n in menuLists">
                        <li @click="waiting" v-if="n.type==4"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
                </ul>
            </li>
            <li class="color999">
                <span  @click="changeShow(4)">
                    <i class="icon iconfont">&#xe647;</i>商户管理
                    <i class="icon iconfont showbtn" v-show="!showUl[4].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[4].isshow">&#xe620;</i>
                </span>
                <ul v-show="showUl[4].isshow">
                    <template  v-for="n in menuLists">
                        <li @click="waiting" v-if="n.type==5"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
                </ul>
            </li>
            <li class="color999" @click="waiting">
                <span>
                    <i class="icon iconfont">&#xe64b;</i>应用商城
                </span>
            </li>
            <li>
                <span  @click="changeShow(6)">
                    <i class="icon icon-wrench"></i>设置
                    <i class="icon iconfont showbtn" v-show="!showUl[6].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[6].isshow">&#xe620;</i>
                </span>
                <ul v-show="showUl[6].isshow">
                    <template  v-for="n in menuLists">
                        <li v-if="n.type==7"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
                    <li><a v-link="{name:'password-config'}">密码设置</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import store from '../../vuex/store'
    export default{
        data(){
            return{
                menuLists: [],
            }
        },
        store,
        vuex: {
            getters: {
                links ({ titles }) {
                    let link=''
                    if(titles.crumbsList.length>1){
                        link=titles.crumbsList[0].link
                    }
                    return link;
                },
                showUl ({ showMenu }) {
                    return showMenu.menuShow;
                }
            }
        },
        methods:{
            getMenuHeight(){
                let availableHeight = document.body.clientHeight  - document.querySelector('.header').offsetHeight;
                document.querySelector('.content').style.height=availableHeight+'px';
            },
            waiting(){
                dialog('info','正在开发中，敬请期待！');
            },
            changeShow(index){
                store.dispatch('SHOW_MENU',index);
            }
        },
        ready(){
            this.getMenuHeight();
            window.onresize=(()=>{
                (!!document.querySelector('.content'))?this.getMenuHeight():null;
            });
        },
        created(){
            this.$set('menuLists',JSON.parse(sessionStorage.getItem('menuList')))
        }
    }
</script>

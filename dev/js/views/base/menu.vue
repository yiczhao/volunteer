<template>
    <div class="menu">
        <ul class="menu-first">
            <li><a v-link="{name:'home'}"><i class="icon icon-home"></i>首页</a></li>
            <li>
                <span @click="changeShow(0)">
                    <i class="icon iconfont">&#xe647;</i>用户管理
                    <i class="icon iconfont showbtn" v-show="!showUl[0].isshow">&#xe619;</i>
                    <i class="icon iconfont showbtn" v-show="showUl[0].isshow">&#xe620;</i>
                </span>
                <ul>
                    <li><a :class="{'link-active':links=='user-management'}" v-link="{name:'user-management'}">用户管理</a></li>
                </ul>
                <ul>
                    <template v-for="n in menuLists">
                        <li v-if="n.type==1"><a :class="{'link-active':links==n.code&&!!n.code}" v-link="{name:n.code}">{{n.name}}</a></li>
                    </template>
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

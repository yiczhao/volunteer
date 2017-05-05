<template>
    <div class="ks-col  KsItem"  
        v-el:floor
        @click="clickinput()" >
        <input type="text" class="KsItem-input full" 
            readonly="readonly"
            v-model="floor_value" />
        <i :class="floor_show ? 'icondown' : 'iconup'"></i>
        <ul v-show = "floor_show">
            <li 
                v-for="item in floorlist"
                :class="{
                    'check':ischeck == $index ,
                    'disabled': item.isdisabled ? true :false
                }"
                @click="choosefloor(item)">
                <span>{{item.name }}</span>
                <i></i>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
    export default {
        props:{
            floor_value:{
                type:String,
                default:'B1',
            },
            limit_before:{
                type:String,
                default:'',
            },
            limit_after:{
                type:String,
                default:'',
            },
            isdisabled:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                floorlist:[],
                floorlistafter:[],
                floor_show:false,
                ischeck:-1,
            }
        },
        methods:{
            clickinput(){
                if(!this.limit_before)
                {
                    this.floorlistafter.forEach(m=>{
                        m.isdisabled = false
                    })
                }
                var isdisabledarray = []        
                if(this.limit_after){
                    
                    this.floorlist = this.floorlistafter.concat()
                    this.floorlist.forEach((t,index)=>{
                        if(t.name == this.limit_after)
                        {
                            if(this.isdisabled)
                            {
                                //console.log(index)
                                //console.log(this.limit_after)
                                for(var j = index + 1;j < this.floorlist.length;j++)
                                {
                                    this.floorlist[j].isdisabled = true
                                }
                            }else{
                                this.floorlist.splice(index+1,this.floorlist.length-1)
                            }
                        }

                    })              
                }

                this.floor_show = !this.floor_show
                if(this.floor_value){
                    this.floorlist.forEach((t,index)=>{
                        if(t.name == this.floor_value)
                        {
                            this.ischeck = index
                        }
                    })
                }
                
            },
            choosefloor(item){
                //this.floor_show = !this.floor_show
                if(item.isdisabled)  return 

                this.floor_value = item.name
                if(this.limit_before){
                    if(!~this.floor_value.indexOf('B'))
                    {
                        //有F---
                        //有F-
                        if(!~this.limit_before.indexOf('B')){
                            if(+this.floor_value.split('F')[1] > +this.limit_before.split('F')[1])
                            {
                                this.limit_before = ''
                            }
                        }else{
                            //有B-
                                this.limit_before = ''
                        }
                    }else{
                        //有B---
                        if(this.limit_before.indexOf('B') !=-1){
                            //有B-
                            if(+this.floor_value.split('B')[1] < +this.limit_before.split('B')[1])
                            {
                                this.limit_before = ''
                            }
                        }
                    }
                }
            }
        },
        ready(){
            for(var i=20;i>=1;i--)
            {
                this.floorlist.push({name:'F' + i,isdisabled:false});
                this.floorlistafter.push({name:'F' + i,isdisabled:false});
            }

            for(var j=1;j<=5;j++){
                this.floorlist.push({name:'B' + j,isdisabled:false});
                this.floorlistafter.push({name:'B' + j,isdisabled:false});
            }

            

            window.addEventListener('click',(e)=>{
                if(this.$els.floor == null) return
                if(!this.$els.floor.contains(e.target))
                {
                    this.floor_show = false
                }
            })
                 
        }
    }
</script>
<style lang="scss">
  @import "../styles/Floor";
</style>


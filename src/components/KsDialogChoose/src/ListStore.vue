<template> 
<div class="KsList">
	<ul>
	    <li v-for = "i in list" 
	        :class="i.ischecked && 'check'"
	        @click="choosestore($index)">
	        <span>{{i[nameMate]}}</span>
	        <i></i>
	    </li>
	</ul>
</div> 
</template>
<script type="text/javascript">  
 export default {  
    props:{
        list:{
            type:Array
        },
        sid:{
            type:Array
        },
        typeMate:{
            type:String,
            default:'id'
        },
        nameMate:{
            type:String,
            default:'name'
        }
    },
    methods:{

    	choosestore(index){
            //debugger
            //t.ischecked = !t.ischecked
            this.list[index].ischecked = !this.list[index].ischecked
            //console.log(this.sid)
            var listarr = []
            this.list.forEach(t=>{
                if(t.ischecked)
                {
                   listarr.push(t[this.typeMate]) 
                }
            })
            this.sid = listarr

            this.$emit('change',listarr)
        }
    },
    watch:{
        list(val){

            if(this.sid){
                val.forEach(t=>{
                    this.sid.forEach(item=>{

                        if(t[this.typeMate] == item)
                        {
                            t.ischecked = true
                        }
                    })
                    
                })
            }

            
        }
    },
    ready(){

    }
}
</script>
<style lang="scss">
  @import "../styles/KsDialogChoose";
</style>

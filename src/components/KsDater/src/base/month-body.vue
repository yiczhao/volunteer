<template>
    <div class="KsDateMonth" cid="KsDateMonth">
    <div v-on:click="pick($event)">
        <div class="_days"
            v-for="row in 3">
            <span id="month{{_uid}}_{{[4*row+index]}}" v-bind:class="{
                'pass':months[4*row+index] 
                       && months[4*row+index].status == 'disabled',
                'active':months[4*row+index] 
                       && months[4*row+index].status == 'active',
                }" 
                v-for="(index,item) in 4">{{months[4*row+index].val}}</span>
        </div>
    </div>
    </div>
</template>

<script type="text/javascript">
    import { getMonths } from '../util/lang'
    var months = getMonths()

    export default {

        data(){
            return {

            }
        },
        computed:{
            months:{
                get(){
                    // var monthval = ''
                    // if(this.interior.year == this.year) {
                    //     monthval = this.interior.month
                    // }
                    
                    return months.map((month,index)=>{
                        var status = ''
                        if(index+1 == this.month) status = 'active'
                        return {val:month,status:status}
                    })
                }
                
            }
        },
        methods:{
            pick(event){
                var id = event.target.id,index
                if(!id) return
                id = id.split('_')
                this.month = +id[1]+1
                // this.output()
                // console.log(this.month)
            }
        }
    }
</script>
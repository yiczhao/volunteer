<template>
    <div class="KsDateMonth" cid="KsDateMonth">
        <div class="KsDateMonth-date">
            <div class="KsDateMonth-date-head">
                <div class="retreat" v-on:click="prev">&lt;</div>
                <div class="year" v-text="year+'年'"></div>
                <div class="next" v-on:click="next">&gt;</div>
            </div>
            <div v-on:click="pick($event)">
                <div class="KsDateMonth-date-days"
                    v-for="row in 3">
                    <span v-bind:id="'month'+_uid
                              +'_'+[4*row+index]
                              +'_'+(months[4*row+index] 
                               && months[4*row+index].status)" 
                        v-bind:class="{
                        'pass':months[4*row+index] 
                               && months[4*row+index].status == 'disabled',
                        'active':months[4*row+index] 
                               && months[4*row+index].status == 'active',
                        }" 
                        v-for="(index,item) in 4">{{months[4*row+index].val}}</span>
                </div>
            </div>
            <div class="KsDateMonth-date-btn">
                <span class="today" v-on:click="curmonth">本月</span>
                <span class="clear" v-on:click="clearmonth">清除</span>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { getMonths , fullzero} from './util/lang'

    var months = getMonths()
    
    export default {
        VERSION:'1.0.0',
        props:{
            value:{
                type:String,
                default:''
            },
            min:{
                type:String,
                default:''  
            },
            max:{
                type:String,
                default:''  
            }
        },
        data(){
            // console.log(this.value)
            if(this.value){
                var yearmonth = this.value.split('-')
                var year = yearmonth[0]
                var month = yearmonth[1]    
            }else{
                var dater = new Date()
                var year = dater.getFullYear()
            }

            this.min = this.min.replace(/-/g,'')
            this.max = this.max.replace(/-/g,'')
            
            return {
                year:year,
                month:month,
                interior : {
                    year:year,
                    month:month
                }
            }
            
        },
        
        computed:{
            value:{
                get(){
                    // console.log(this.interior.year+'-'+fullzero(this.interior.month))
                    return this.interior.year+'-'+fullzero(this.interior.month)
                },
                set(val){
                    
                    if(!val || this.interior.month!=this.month) return
                    
                    var yearmonth = val.split('-')
                    this.year = yearmonth[0]
                    this.month = yearmonth[1]
                    this.output()
                }
            },         
            months(){
                var monthval = ''
                if(this.interior.year == this.year) {
                    monthval = this.interior.month
                }
                
                return months.map((month,index)=>{
                    var status = '',
                        bond = this.year+''+fullzero(index+1)

                    
                    if(index+1 == monthval) status = 'active'
                    if(this.banLimit(bond)) {
                        status = 'disabled'
                    }
                    return {val:month,status:status}
                })
                
            }
        },
        methods:{
            prev(){
                this.year = +this.year - 1
            },
            next(){
                this.year = +this.year + 1
            },
            banLimit(val){
                if((this.min && val < this.min)
                    || (this.max && val > this.max)) {
                    return true
                }
                return false
            }, 
            pick(event){
                var id = event.target.id,index
                if(!id) return
                id = id.split('_')
                if('disabled' == id[2]) return
                this.month = +id[1]+1
                this.output()
                // console.log(this.month)
            },
            curmonth(){
                var dater = new Date()
                this.year = dater.getFullYear()
                this.month = 1+dater.getMonth()
                if(!this.banLimit(this.year+''+fullzero(1+dater.getMonth()))){
                    this.output()    
                }
                
            },
            output(){
                this.interior.month = this.month
                this.interior.year = this.year
                this.$emit('change',this.value)    
            },
            clearmonth(){
                this.interior.month = ''
                this.$emit('change','')    
            }
        },
        created(){
            // if(this.value)
            // console.log(this.value)
            // var dater = new Date()
            // this.year = dater.getFullYear()
            // this.value = this.value
            // this.curmonth()
        }

    }
</script>
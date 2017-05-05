<template>
  <div class="KsDatePicker" cid="KsDatePicker"
       :class="{'readonly':readonly}">
    <div class="_input" v-on:mouseup="show=!show">
      <div class="ks-col-auto date-icon"><i class="icon"></i></div>
      <input type="text" class="ks-col" placeholder="{{placeholder}}" v-model="value" readonly>
    </div>
    <ks-dater 
        v-bind:min="min" 
        v-bind:max="max"
        v-if="type!='datemonth'"
        v-show="show" 
        v-bind:value="value" 
        v-bind:type="type" 
        v-bind:readonly="readonly" 
        v-on:change="change"></ks-dater>
    <ks-date-month 
        v-bind:min="min" 
        v-bind:max="max"
        v-if="type=='datemonth'"
        v-show="show" 
        v-bind:value="value" 
        v-bind:type="type" 
        v-bind:readonly="readonly" 
        v-on:change="change"></ks-date-month>

  </div>
</template>
<script>
    import props from './mixins/props.js'
    import dater from './dater.vue'
    import dateMonth from './date-month.vue'
    export default {
        VERSION:'1.0.0',
        components:{
            'ks-dater':dater,
            'ks-date-month':dateMonth
        },
        mixins: [props],
        props:{
            placeholder: { type: String, default: '' }
        },
        data(){

            return {
                show:false,
            }
        },
        computed:{

        },
        methods:{
            close(){
                this.show = false
            },
            isContains(e){
                if (this.$el && !this.$el.contains(e.target)) {
                    this.close()
                }
            },
            
            // dater callback
            change(cur_date){
                this.value = cur_date
                this.$nextTick(()=>{
                    this.$emit('change',cur_date)    
                })
                if(this.type != 'datemulti' && this.type != 'datetime' ){
                    this.close()
                }
            }
           
        },
        ready(){
            document.addEventListener('click',this.isContains, false)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.isContains, false)
        }
    }
</script>
<style lang="scss">
    @import '../styles/date';
</style>

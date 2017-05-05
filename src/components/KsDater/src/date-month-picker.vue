<template>
  <div class="KsDatePicker" cid="KsDatePicker"
       :class="{'readonly':readonly}">
    <div class="_input" v-on:mouseup="show=!show">
      <div class="ks-col-auto date-icon"><i class="icon"></i></div>
      <input type="text" class="ks-col" placeholder="{{placeholder}}" v-model="value" readonly>
    </div>
    <ks-dater v-show="show" :value="value" :type="type" :readonly="readonly" v-on:change="current_change"></ks-dater>
  </div>
</template>
<script>
    import props from './mixins/props.js'
    import dater from './dater.vue'
    export default {
        components:{
            'ks-dater':dater
        },
        mixins: [props],
        props:{
            placeholder: { type: String, default: '' }
        },
        data(){

            return {
                show:false,
                input_value : ''
            }
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
            current_change(cur_date){
                this.value = cur_date
                this.$nextTick(()=>{
                    this.$emit('change',cur_date)    
                })
                if(this.type != 'datemulti' && this.type != 'datetime' ){
                    this.close()
                }
            }
           
        },
        watch:{
            value(val){}
        },
        created(){},
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

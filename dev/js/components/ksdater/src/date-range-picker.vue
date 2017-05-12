<template>
    <div class="KsDaterMultiPicker" :class="{'readonly':readonly}" cid="KsDaterMultiPicker">
        <div class="_input" v-on:mouseup="show=!show">
            <div class="ks-col-auto date-icon"><i class="iconfont">&#xe615;</i></div>
            <div class="ks-col">
                <div class="ks-row-auto">
                    <div class="ks-col">
                        <input type="text" readonly placeholder="{{placeholder[0]}}" :value="range[0]">
                    </div>
                    <i class="iconfont ks-col-auto scope-icon">&#xe677;</i>
                    <div class="ks-col">
                        <input type="text" readonly placeholder="{{placeholder[1]}}" :value="range[1]">
                    </div>
                </div>
            </div>
        </div>
        <ks-dater-range v-show="show" v-on:change="change" :range_dater="range"></ks-dater-range>
    </div>
</template>
<script type="text/javascript">
    import props from './mixins/props.js'
    export default {
        mixins: [props],
        props:{
            range:{
                type:Array,
                default(){
                    return []
                }
            },
            placeholder:{
                coerce(val) {
                    val = val || ''
                    if(Array.isArray(val)) return val
                    if(~val.indexOf(',')) return val.split(',')
                    return [val]
                }
            }
        },
        data() {
            return {
                show:false
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
            change(range){
                // console.log(range)
                this.range = range
                range.length == 2 && this.$emit('change',range)
            }
        },
        ready(){
            document.addEventListener('click',this.isContains , false)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.isContains, false)
        }

    }
</script>

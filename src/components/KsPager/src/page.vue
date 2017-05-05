<template>
    <ul v-show="total" class="KsPage" cid="KsPage" @click="emitClick($event)">
        <li :class="{'disabled':current == 1}">&lt;</li>
        <li v-for="i in pages"
            track-by="$index"
            :class="{'active':current == i}" v-text="i"></li>
        <li :class="{'disabled':current == pages[pages.length-1]}">&gt;</li>
    </ul>
</template>
<script type="text/javascript">
    
    import props from './mixins'
    export default {
        VERSION:'1.1.0',
        mixins:[props],
        data (){
            return {
                pages : [],
            }
        },
        
        methods: {
            init (){
                this.totalLength = this.getTotalLength(this.total,this.size)
                this.pages = this.buildPages(this.current,this.length,this.totalLength)
            },
            /**
             * [getTotalLength 总页数]
             * @param  {[Number]} total [总条数]
             * @param  {[Number]} size  [每页条数]
             * @return {[Number]}       [总页数]
             */
            getTotalLength (total,size){
                var mod = total % size
                return  (total-mod)/size + (mod && 1)
            },
                
            /**
             * [createPurePages 生成无折叠符的分页数组]
             * @param  {[Number]} current     [当前页数]
             * @param  {[Number]} length      [展示长度]
             * @param  {[Number]} totalLength [总页数]
             * @return {[Array]}              [分页新数组]
             */
            createPurePages (current,length,totalLength){
                var arr = [],len,max
                if(length > totalLength){
                    length = totalLength
                    max = totalLength
                    len = totalLength-1
                }else{
                    len = length - 1
                    max = current + len/2
                    current <= len/2  && (max = length)
                    max > totalLength && (max = totalLength)
                }
                    
                
                for (var i = len ; i>=0; i--){
                    arr.push(max - i)
                }
                return arr
            },
            // 
            /**
             * [addFold 折叠，添加省略号]
             * @param {[Number]} max [总页数]
             * @param {[Array]} arr  [纯净分页数组]
             * @return {[Array]}     [带符号的分页数组]
             */
            addFold (max,arr){
                var last
                arr = arr || []
                arr = [].concat(arr)
                last= arr.length-1
                
                if(arr[0] > 1){
                    arr[0] = 1
                    arr[1] = '···'
                }
                if(arr[last] < max){
                    arr[last] = max
                    arr[last -1] = '···'
                }
                return arr
            },
            buildPages (current,length,totalLength) {
                var arr 
                arr = this.createPurePages(current,length,totalLength)    
                arr = this.addFold(totalLength,arr)
                return arr
                
            },
            // 点击分页主体
            emitClick (event){

                var value = event.target.innerHTML.trim()

                switch(true){
                    // left
                    case '&lt;' === value :
                        --this.current
                        this.current < 1 && (this.current = 1)
                    break;
                    // right
                    case '&gt;' === value :
                        ++this.current
                        this.current = Math.min(this.current,this.totalLength)
                    break;
                    case '···' === value :break;
                    case !isNaN(value):
                        this.current = +value
                    break;
                }

                this.$emit('change',this.current)
            },
            
            warn(){
                if(!this.total) return
                if(this.length%2==0) {
                    this.length = this.length - 1
                    console.error('分页中的参数 pages 或 length 请传入奇数 , 自动转为：'+this.length)
                }
            }
        },
        watch: {
            'current' (val){
                // console.log(val)
                
                this.pages = this.buildPages(val,this.length,this.totalLength)
            },
            'size'(){
                this.current = 1
            },
            'total + size + length'(){
                this.init()
            }
        },
        created (){
            this.warn()
            this.init()
        }
    }
</script>
<style lang="scss">
    @import '../styles/paging.scss';
    
</style>
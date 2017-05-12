import {parse , stringify  , split_dt , fullzero} from '../util/lang'
import props from './props'

export default {
        name:'multi',
        data () {
            return{}
        },
        methods: {
            multi(){}
        },
        watch: {
            value(val,oldval){
                var addItem = ''
                // console.log(val)
                if(this.type == 'datemulti'){

                     ~val.indexOf(',') 
                        ? (this.point_daters = val.split(','))
                        : (this.point_daters = [val])
                    this.point_daters = this.point_daters.filter((v)=>{
                        if(v) return v
                    })
                    
                    if(val.length > oldval.length){
                        addItem = this.point_daters[this.point_daters.length-1]
                    }else{
                        // console.log(this.now,'=====')
                        addItem = stringify(this.now)
                    }
                    // console.log('addItem',addItem)
                    // console.log('oldval',oldval)
                    var now = (addItem && parse(addItem)) || parse(oldval)
                    // console.log('this.now = ',now)
                    this.now = now 

                }
            }
        },
        created () {
            if(this.type == 'datemulti') {
                this.point_daters = []
                ~this.value.indexOf(',') 
                    ? (this.point_daters = this.value.split(','))
                    : (this.value && this.point_daters.push(this.value))

                // console.log(this.value);    
            }

         
        }

    }
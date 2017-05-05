export default {
        params: ['limit','min'],
        twoWay: true,
        bind () {
            
            var limit = this.params.limit || 100000
            var min = this.params.min || 0

            if(this.el.addEventListener){
                this.el.addEventListener('input', e=>{
                    this.handler.call(this,limit,min)
                })
            }else if(this.el.attachEvent){
                this.el.attachEvent('onpropertychange',event=> {
                    if(event.propertyName!='value') return
                    this.handler.call(this,limit,min)
                })
            }else{
                this.el.addEventListener('keyup', ()=>{
                    this.handler.call(this,limit,min)
                })
            }


        },
        handler(limit,min) {

                //debugger
                // var reg = new RegExp('^[0-9]+(\\.[0-9]{0,'+this.arg+'})?$')

                var temp_val = this.el.value,ints,fixed = ''
                
                if(temp_val.length==1&&temp_val=="-"&&min!=0) return 
                   
                if(parseInt(temp_val)<-1){
                        temp_val="-"
                }else{
                    if(temp_val=='' || isNaN(parseInt(temp_val))) {
                        temp_val = ''
                    }else{
                        ints = this.get_ints(temp_val,limit,min)
                        fixed = this.get_fixed(temp_val,this.arg)
                        temp_val = ints+fixed
                    }
                }

                this.el.value = temp_val
                this.set(temp_val)
                
            },

            /**
             * 获取整数部分
             * INF 无穷大
             */
            get_ints (temp_val,limit,min){
                var ints = parseInt(temp_val, 10)
                if(limit!='INF' && ints > limit){
                    ints = (''+ints).substr(0,(''+ints).length-1)
                }

                return ints
            },

            // 获取小数部分
            get_fixed (temp_val,limit,min){
                //debugger
                var fixed = ''
                if(limit && ~temp_val.indexOf('.')){
                    if(temp_val.split('.')[1].length!=1){
                        temp_val.split('.')[1].split('').map(t=>{
                         fixed += isNaN(parseInt(t)) 
                                        ? ''
                                        : parseInt(t)
                        })
                    }else{
                        fixed=temp_val.split('.')[1]
                        fixed = isNaN(parseInt(fixed)) 
                                        ? ''
                                        : parseInt(fixed)
                    }
                    
                   
                    fixed = '.'+ ((''+fixed).substr(0,limit))
                }
                return fixed
            }
    }
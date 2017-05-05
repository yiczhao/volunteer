<template>
  <div class="AddTableItem">
    <ks-dialog-program
      :show="is_show"
      :cb-close="close_dialog"
      :width="width"
      :is_storetype = "is_storetype">
      <div class="dialog-main" id = "dialog">
        <div class="btn-group">
          <ul>
            <li v-for="i in list"
                @click="clicktablehead($index)"
                :class="(showindex == $index) && 'check'">
              <span>{{i.title}}</span>
            </li>
            <li class="btn-add"
                @click="addtablename()"
                v-show = "addicon && list.length < 11"></li>
          </ul>
        </div>
        <div
          v-for = "listitem in list"
          v-show = "showindex == $index">
          <div class="top" >
            <div class="btn-input">
              <input type="text" class="AddTableItem-input"
                     v-model = "listitem.title"
                     @click = "modifyname($event,$index)"
                     @keyup.enter="savetablename($event,$index)">
              <span
                @click="deletetable($index)"
                v-show="$index != 0">删除当前分组</span>
            </div>
            <div class="table-default">
              <ul>
                <li
                  v-for = "n in listitem.defaultlist"
                  :class = "n.ischeck && 'alreadychoose'"
                  @click="removedefault(n,$index)">
                  <span>{{n.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="middle" >
            <div class="ks-row mb-20" v-for="first in listitem.addlist">
              <div class="ks-col title">{{first.title}}</div>
              <ul class="ks-col">
                <li
                  v-for="item in first.list_data"
                  :class="(item.isdisabled) && 'disabled'"
                  @click="adddefault(item,$index,first)">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottom" >
            <span class="tip">点击你需要的表格项添加或移除，也可以拖拽进行排序</span>
            <div class="txtr btngroup">
              <span class="reset" @click="reset($index)">重选</span>
              <span class="checkall" @click="checkall($index)">全选</span>
              <ks-button :ghost="true" type="other" style="margin-right: 10px"
                         @click="close_dialog">取消</ks-button>
              <ks-button :type="'primary'"
                         @click="savetable()">确认</ks-button>
            </div>
          </div>
        </div>
      </div>
    </ks-dialog-program>
  </div>
</template>
<script type="text/javascript">
  import KsButton from '../../KsButton'
  import KsDialogProgram from '../../KsDialogProgram'
  export default {
    components:{
      KsDialogProgram:KsDialogProgram,
      KsButton:KsButton
    },
    props:{
      list:{
        type:Array
      },
      checkalllist:{
        type:Array
      },
      datasource:{
        type:Object
      },
      is_show:{
        type:Boolean,
        default:false,
      },
      width:{
        type:Number
      },
      is_storetype:{
        type:Boolean,
        default:false
      },
      prefix:{
        type:String
      }
    },
    data() {
      return {
        showindex:0,
        addicon:true,
        tableindex:-1,
        addIndex:-1
      }
    },
    methods:{
      //点击全部选择
      checkall(index){
        var data = JSON.parse(JSON.stringify(this.checkalllist))
        this.list[index].defaultlist  = data

        this.list[index].addlist.forEach((t)=>{
          t.list_data.forEach((i)=>{
            i.isdisabled = true
          })
        })
      },
      //重新选择
      reset(index){
        var data = JSON.parse(JSON.stringify(this.datasource.defaultlist))
        this.list[index].defaultlist = data
        this.list[index].addlist.forEach((t)=>{
          t.list_data.forEach((i)=>{
            i.isdisabled = false
          })
        })
      },
      //删除当前分组
      deletetable(index){
        this.list.splice(index,1)
        this.showindex = index-1
      },
      //更改表头名字,点击input
      modifyname(event,index){
        event.target.focus()
      },
      //不可更改表头名字,按下enter
      savetablename(event,index){
        event.target.blur()
      },
      //点击表头
      clicktablehead(index){
        this.showindex = index
      },
      //保存表格
      savetable(){
        var prefix = this.prefix + '_list'
        if(!this.addicon)
        {
          var data = JSON.parse(localStorage.getItem(prefix))
          data[this.tableindex] = this.list[0]
          localStorage.setItem(prefix,JSON.stringify(data))
        }else{
          localStorage.setItem(prefix,JSON.stringify(this.list))
        }
        //console.log(JSON.parse(localStorage.getItem('list')))
        this.is_show = false
      },
      //点击下面上去
      adddefault(n,index,parent){
        if(n.isdisabled) { return }
        this.list[this.showindex].defaultlist.push(
          {
            title:parent.title,
            id:n.id,
            name:n.name,
            ischeck:true
          })

        parent.list_data[index].isdisabled = true
      },
      //点击上面撤销
      removedefault(n,index){
        if(!n.title){ return }
        this.list[this.showindex].addlist.forEach((t,index)=>{
          if(t.title == n.title)
          {
            t.list_data.forEach((i)=>{
              if(i.name == n.name)
              {
                i.isdisabled = false
              }

            })
          }
        })

        this.list[this.showindex].defaultlist.splice(index,1)
      },
      //点击增加一个表,+
      addtablename(event){
        //var num = {1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七",8:"八",9:"九",10:"十"}
        var data= JSON.parse(JSON.stringify(this.datasource))
        //data.title = "自定义" + num[this.list.length]
        data.title = "自定义表"
        data.tableid = this.list.length
        this.list.push(data)
        this.showindex = this.list.length-1
      },
      close_dialog(){
        this.is_show = false
      }

    },
    events:{
      'show_dialog'(index){

        var prefix = this.prefix + '_list'
        this.showindex = 0
        this.tableindex = index
        if(localStorage.getItem(prefix)!=null)
        {
          this.list = JSON.parse(localStorage.getItem(prefix))
        }
        if(index!=-1)
        {
          this.list = [JSON.parse(JSON.stringify(this.list[index]))]
          this.addicon = false
        }else{
          this.addicon = true
        }
        this.is_show = true

      }
    },
    watch:{
      'list'(val){
        this.list = val

      }
    },
    ready(){


    }

  }
</script>
<style lang="scss">
  @import "../styles/AddTable";
</style>

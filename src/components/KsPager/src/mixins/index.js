export default {
    props: {
        // 总条数
        total: {type:Number, default:0 }, 
        // 展示分页个数 pages => length (展示长度 ，迁移为length)
        length: {type:Number, default:7 }, 
        // 当前选中的页数 page_current => current (迁移为current)
        current: {type:Number, default:1 }, 
        // 每页展示条数 page_size => size (迁移为size)
        size :{type:Number, default:10 },
        onChange:Function
    }
}

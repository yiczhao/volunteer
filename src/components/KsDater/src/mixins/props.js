import { format_conver } from '../util/lang'
export default {
    props: {

        readonly: { type: Boolean, default: false },
        value: {
            type: String
        },
        // year/month/date/week/datetime/datemulti/datetimerange/daterange
        type: {type:String,default:'date'},
        min: {type:String,default:''},
        max: {type:String,default:''},
        format: { type: String, default: 'YYYY-MM-DD' }

    }
}

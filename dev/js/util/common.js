/**
 * Created by yiczhao on 2016/12/15.
 */
window.setCookie =(cname, cvalue, exdays)=>{
    var d = new Date();  
    d.setTime(d.getTime() + (exdays*24*60*60*1000));  
    var expires = "expires="+d.toUTCString();  
    document.cookie = cname + "=" + cvalue + "; " + expires;  
};
window.getCookie =(cname)=>{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};
window.clearCookie =(name)=>{
    setCookie(name, "", -1); 
};
window.formDataRequest =(url)=>{
    return Vue.resource(url, null, null, {
        emulateJSON: true
    })
}
window.getFormData =(data)=>{
    let formData='';
    _.map(data,(val,key)=>{  
        formData+= key+'='+val+'&';
    })
    formData=formData.substring(0,formData.length-1);
    return formData;
}
window.dialog=((types,mes)=>{
    switch (types){
        case 'error':
            swal({
                title: mes,
                type: "error",
                confirmButtonText: "确定",
                confirmButtonColor:"#ededed"
            })
            break;
        case 'success':
            swal({
                title: mes,
                type:"success",
                confirmButtonText: "知道了",
                confirmButtonColor:"#ededed"
            })
            break;
        case 'info':
            swal({
                title: mes,
                type:"info",
                confirmButtonText: "知道了",
                confirmButtonColor:"#ededed"
            })
            break;
        case 'successTime':
            swal({
                title: mes,
                type:"success",
                timer: 2000,
                confirmButtonText: "知道了",
                confirmButtonColor: "#ededed"
            })
            break;
        default:
            swal({
                title: '保存成功',
                type:"success",
                confirmButtonColor: "#ededed"
            })
            break;
    }
})
window.stringify = (dater , format)=>{
    var year = dater.getFullYear()
    var month = dater.getMonth() + 1
    var date = dater.getDate()
    // var monthName = months[dater.getMonth()]

    format = format || 'YYYY-MM-DD'

    var map = {
        YYYY: year,
        // MMM: monthName,
        MM: ('0' + month).slice(-2),
        M: month,
        DD: ('0' + date).slice(-2),
        D: date
    }
    return format.replace(/Y+|M+|D+/g, function (str) {
        return map[str]
    })
}

window.buildParams=function( prefix, obj, traditional, add ) {
    let name;
    let rbracket = /\[\]$/;
    if ( _.isArray( obj ) ) {

        // Serialize array item.
        _.map( obj, function( i, v ) {
            if ( traditional || rbracket.test( prefix ) ) {

                // Treat each array item as a scalar.
                add( prefix, v );

            } else {

                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                    v,
                    traditional,
                    add
                );
            }
        } );

    } else if ( !traditional && typeof( obj ) === "object" ) {

        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {

        // Serialize scalar item.
        add( prefix, obj );
    }
}
window.paramData = function( a, traditional ) {
    let prefix,
        s = [],
        r20 = /%20/g,
        add = function( key, value ) {

            // If value is a function, invoke it and return its value
            value =( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
        };
    if ( _.isArray( a ) ) {
        _.map( a, function() {
            add( this.name, this.value );
        } );

    } else {

        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            buildParams( prefix, a[ prefix ], traditional, add );
        }
    }

    // Return the resulting serialization
    return s.join( "&" ).replace( r20, "+" );
};
window.getDates=function(){
    var date = new Date(),
        lyear = date.getFullYear(),
        lmonth = date.getMonth() + 1,
        agoMonth = lmonth-1,
        lday = date.getDate(),
        pdate = new Date(date.getTime() - 7 * 24 * 3600 * 1000),
        pyear = pdate.getFullYear(),
        pmonth = pdate.getMonth() + 1,
        pday = pdate.getDate(),
        locakDate=lyear + '-' + lmonth + '-' + lday,
        pastDate=pyear + '-' + pmonth + '-' + pday,
        agoMonthDate=lyear+'-'+agoMonth+'-'+lday,
        data={
            today:locakDate,
            aweekAgo:pastDate,
            amonthAgo:agoMonthDate
        };
    return data
}

var _i={};
_i.fetchArray=(key)=>{
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }
    return false;
};
_i.saveArray=(key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}
_i.isback=false;
_i.num=0;
window.back_json=_i;

/**
 * addEvent
 * author laynezhou@tencent.com
 */
window.Event = {};
var Event = {
    funcList: {}, //保存delegate所绑定的方法
    ieFuncList: {}, //由于保存在ie下绑定的方法
    on: function(obj, selector, type, fn) {
        if (!obj || !selector) return false;
        var fnNew = Event.delegateHandle(obj, selector, fn);
        Event.addEvent(obj, type, fnNew);
        /* 将绑定的方法存入Event.funcList，以便之后解绑操作 */
        if (!Event.funcList[selector]) {
            Event.funcList[selector] = {};
        }
        if (!Event.funcList[selector][type]) {
            Event.funcList[selector][type] = {};
        }

        Event.funcList[selector][type][fn] = fnNew;
    },

    off: function(obj, selector, type, fn) {
        if (!obj || !selector || !Event.funcList[selector]) {
            return false;
        }
        var fnNew = Event.funcList[selector][type][fn];
        if (!fnNew) {
            return;
        }

        Event.offEvent(obj, type, fnNew);
        Event.funcList[selector][type][fn] = null;
    },

    delegateHandle: function(obj, selector, fn) {
        /* 实现delegate 的转换方法，事件冒泡上升时, 符合条件时才会执行回调函数 */
        var func = function(event) {
            var event = event || window.event;
            var target = event.srcElement || event.target;
            var parent = target;

            function contain(item, elmName) {
                if (elmName.split('#')[1]) { //by id
                    if (item.id && item.id === elmName.split('#')[1]) {
                        return true;
                    }
                }
                if (elmName.split('.')[1]) { //by class
                    if (hasClass(item, elmName.split('.')[1])) {
                        return true;
                    }
                }
                if (item.tagName == elmName.toUpperCase()) {
                    return true; //by tagname
                }
                return false;
            }
            while (parent) {
                /* 如果触发的元素，属于(selector)元素的子级。 */
                if (obj == parent) {
                    return false; //触发元素是自己
                }
                if (contain(parent, selector)) {

                    fn.call(obj, event);
                    return;
                }
                parent = parent.parentNode;
            }
        };
        return func;
    },
    addEvent: function(target, type, fn) {
        if (!target) return false;
        var add = function(obj) {
            if (obj.addEventListener) {

                obj.addEventListener(type, fn, false);

            } else {
                // for ie
                if (!Event.ieFuncList[obj]) Event.ieFuncList[obj] = {};
                if (!Event.ieFuncList[obj][type]) Event.ieFuncList[obj][type] = {};
                Event.ieFuncList[obj][type][fn] = function() {
                    fn.apply(obj, arguments);
                };
                obj.attachEvent("on" + type, Event.ieFuncList[obj][type][fn]);
            }
        }
        if (target.length >= 0 && target !== window && !target.tagName) {
            for (var i = 0, l = target.length; i < l; i++) {
                add(target[i])
            }
        } else {
            add(target);
        }
    },


    offEvent: function(target, type, fn) {
        if (!target) return false;
        var remove = function(obj) {
            if (obj.addEventListener) {
                obj.removeEventListener(type, fn, false);

            } else {
                //for ie
                if (!Event.ieFuncList[obj] || !Event.ieFuncList[obj][type] || !Event.ieFuncList[obj][type][fn]) {
                    return;
                }
                obj.detachEvent("on" + type, Event.ieFuncList[obj][type][fn], false);
                Event.ieFuncList[obj][type][fn] = {};
            }
        }
        if (target.length >= 0 && target !== window && !target.tagName) {
            for (var i = 0, l = target.length; i < l; i++) {
                remove(target[i])
            }
        } else {
            remove(target);
        }
    },
};
let $id=function(id)
{
    return document.getElementById(id) || id;
}
let $target=function(target)
{
    return document.getElementsByTagName(target) || target;
}
let outer = $id("app")
Event.on(outer,"a","click",()=>{
    if(back_json.num==0){
        back_json.num++;
    }
    sessionStorage.removeItem('forgetid');
    sessionStorage.removeItem('forgetShow');
});
window.onbeforeunload=()=>{
    localStorage.clear();
}
export default  (value,data) => {
	if(!data){
		return ''
	}
	let str='';
	if(!data.length){
		return str
	}
	_.map(data,(val)=>{
		if(val.id==value){
			str=val.name;
		}
	})
	return str;
}


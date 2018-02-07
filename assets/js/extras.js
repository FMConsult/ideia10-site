function isEmpty(vlr, zero){
	zero = zero == null ? true : false ;
	if((vlr == undefined || vlr == null || vlr == '' || vlr == 0) && (zero) )
		return true;
	else if(isNaN(Number(vlr))){
		if(vlr == undefined || vlr == null || vlr == '')
			return true;
		else
			return false;
	}
	else
		return false;
}

function baseUrlApi(){
  return location.protocol +"//"+ location.hostname + ":8080/";
}
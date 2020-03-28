
export const getSections = () => {
  
  return(dispatch => {
		$.ajax({
			url:'/api/section',
			type: 'GET',
			dataType: 'JSON',
		}).done( sections => {

			let obj = { type: 'GET_SECTIONS', sections }
			//console.log("obj ",obj);
			dispatch(obj);
		}).fail( response => {
			console.log(response);
		});
	})
}
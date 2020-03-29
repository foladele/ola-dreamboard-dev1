
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

export const updateSection = (id, section) => {
  
  return(dispatch => {
		$.ajax({
      url: `/api/section/${id}`,
      type: 'PUT',
      data: { section: section },
      dataType: 'JSON'
    }).done( section => {      
      let obj = { type: 'UPDATE_SECTIONS', section }
      //console.log(obj);
      dispatch(obj);
    }).fail( msg => {
       alert(msg.errors);
    });
	})
}

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


export const updateSection = (id, section, sections) => {
  
  return(dispatch => {
		$.ajax({
      url: `/api/section/${id}`,
      type: 'PUT',
      data: { section: section },
      dataType: 'JSON'
    }).done( section => {

      //console.log("updateSection ", sections);
      let editSection = sections.find( i => i.id === section.id );
      editSection.title = section.title;
      editSection.color = section.color;
      editSection.collapse = section.collapse; 
      let obj = { type: 'UPDATE_SECTION', sections }
      console.log(obj);
      dispatch(obj);
    }).fail( msg => {
       alert(msg.errors);
    });
	})
}

export const addSection = (section) => {
  
  return(dispatch => {
		$.ajax({
      url: '/api/section',
      type: 'POST',
      data: { section: section},
      dataType: 'JSON',
    }).done( section => {      
      let obj = { type: 'ADD_SECTION', section }
      console.log(obj);
      dispatch(obj);
    }).fail( msg => {
       alert(msg.errors);
    });
	})
}

export const deleteSection = (id) => {
  
  return(dispatch => {
		$.ajax({
      url: `/api/section/${id}`,
      type: 'DELETE',
      dataType: 'JSON',
    }).done( section => {      
      let obj = { type: 'DELETE_SECTION', section }
      console.log(obj);
      dispatch(obj);
    }).fail( msg => {
       alert(msg.errors);
    });
	})
}

export const getImages = (id) => {
  
  return(dispatch => {
    $.ajax({
      url: `/api/section/${id}/images`,
      type: 'GET',
      dataType: 'JSON',
    }).done( images => {

      let obj = { type: 'GET_IMAGES', images }
      //console.log("obj ",obj);
      dispatch(obj);
    }).fail( response => {
      console.log(response);
    });
  })
}

export const addImages = (id, fileData) => {
  
  return(dispatch => {
    $.ajax({
       url: `/api/section/${id}/images`,
       type: 'POST',
       data: fileData,
       dataType: 'JSON',
       contentType: false,
       processData: false,
       cache: false,
       success: function (data) {
        console.log(data);
       },error: function (data) {  
        console.log(data);  
       }
     }).done( image => {
      let obj = { type: 'ADD_IMAGES', image }
      dispatch(obj);
    }).fail( response => {
      console.log(response);
    });
  })
}

export const getSectionId = (id) => {
  return(dispatch => {
    let obj = { type: 'SECTION_ID', id }
    // console.log(obj);
    dispatch(obj);
  })
}

const imageId = (state = 0, action) => {
	switch(action.type) {		
		case 'IMAGE_ID':
			//console.log("image id", action.id)
			return {
				id: action.id
			};
		default:
			return state;
	}
}

export default imageId;
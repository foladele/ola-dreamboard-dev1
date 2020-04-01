const image = (state = [], action) => {
	switch(action.type) {		
		case 'IMAGE_IMAGE':
			//console.log("image reducer: ", action.image);
			return action.image;
		default:
			return state;
	}
}

export default image;
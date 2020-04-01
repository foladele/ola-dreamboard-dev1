
const images = (state = [], action) => {
	switch(action.type) {		
		case 'GET_IMAGES':
			return action.images;
		case 'ADD_IMAGES':
			console.log("image dispatch: ", action.image);
			return {
				...state, 
				images: action.image
			}
		default:
			return state;
	}
}

export default images;
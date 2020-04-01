
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
			case 'UPDATE_IMAGE':
			console.log("update image dispatch: ", action.image)
		default:
			return state;
	}
}

export default images;
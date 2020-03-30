
const images = (state = [], action) => {
	switch(action.type) {		
		case 'GET_IMAGES':
			return action.images;
		default:
			return state;
	}
}

export default images;
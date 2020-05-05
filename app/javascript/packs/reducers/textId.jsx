const textId = (state = 0, action) => {
	switch(action.type) {		
		case 'TEXT_ID':
			//console.log("image id", action.id)
			return {
				id: action.id
			};
		default:
			return state;
	}
}

export default textId;
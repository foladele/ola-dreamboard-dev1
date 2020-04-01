
const sectionIdReducer = (state = 0, action) => {
	switch(action.type) {		
		case 'SECTION_ID':
			//console.log("sec id", action.id)
			return {
				id: action.id
			};
		default:
			return state;
	}
}

export default sectionIdReducer;
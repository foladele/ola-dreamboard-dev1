
const sections = (state = [], action) => {
	switch(action.type) {		
		case 'GET_SECTIONS':
			//console.log(action.sections)
			return action.sections;
		default:
			return state;
	}
}

export default sections;
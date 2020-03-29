
const sections = (state = [], action) => {
	switch(action.type) {		
		case 'GET_SECTIONS':
			return action.sections;
		case 'UPDATE_SECTION':
			//console.log("redux-before", action.sections);
      return action.sections;
		default:
			return state;
	}
}

export default sections;
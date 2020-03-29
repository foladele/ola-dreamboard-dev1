
const sections = (state = [], action) => {
	switch(action.type) {		
		case 'GET_SECTIONS':
			return action.sections;
		case 'UPDATE_SECTION':
      return action.sections;
    case 'DELETE_SECTION':
      //return action.sections;
		default:
			return state;
	}
}

export default sections;
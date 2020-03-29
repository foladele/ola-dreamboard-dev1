
const sections = (state = [], action) => {
	switch(action.type) {		
		case 'GET_SECTIONS':
			//console.log(action.sections)
			return action.sections;
		case 'UPDATE_SECTIONS':
			// console.log("redux-before", state);
			let sections = state
			let editSection = sections.find( i => i.id === action.section.id);
			editSection.title = action.section.title;
      editSection.color = action.section.color;
      editSection.collapse = action.section.collapse;
      //console.log("redux-after", state);
		default:
			return state;
	}
}

export default sections;
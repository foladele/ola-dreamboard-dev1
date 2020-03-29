import React from 'react';
import { ChromePicker } from 'react-color';

class SectionColor extends React.Component {

  state = {
    newColor: '#fff',
  };
 
 handleChangeComplete = (ncolor, event) => {
   // console.log(this.state.newColor);
    this.setState({ newColor: ncolor.hex });
    this.props.getColor(this.state.newColor);
    
  }


  render() {
    return (
      <div className="row right-align">
        <div className="col s2">
         <ChromePicker 
           color={ this.state.newColor }
           onChangeComplete= { this.handleChangeComplete } 
          />
        </div>
      </div>

    );
  }
}

export default SectionColor;

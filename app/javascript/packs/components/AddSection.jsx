import React from 'react';
import { connect } from 'react-redux';
import M from  'materialize-css/dist/js/materialize.min.js';
import SectionColor from './SectionColor'

class AddSection extends React.Component {

	constructor(props) {
    super(props);

    this.state = { 
      isCardColor: false,
      color: "fff",
      kind: "",
    };

    this.addSection = this.addSection.bind(this);
    this.toggleCardColor = this.toggleCardColor.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  componentDidMount() {
    //console.log("Reaching");
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
       
      },
      onOpenEnd: () => {
        console.log("Open End");
         
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    M.Modal.init(this.Modal, options);    

  }

  addSection(e){

    let title = this.refs.title.value;
    let color = this.state.color;
    let collapse = false;

    //TODO update to get from states
    let kind = "image";
    e.preventDefault();
    let section = {title: title, color: color, collapse: collapse, kind: kind};
    console.log(section);
    this.props.addSection(section);

  }

  handleChange(e) {

    e.preventDefault();
    console.log(e.target.value);
    this.setState({ kind: e.target.value });
  }

  getColor(color) {
    console.log(color);
    this.setState({ color: color });
  }

  toggleCardColor(){
    this.setState({ isCardColor: !this.state.isCardColor })
  }

  render(){
  	return(
  		<div>
  			{/*<p>Welcome to add section</p>*/}

         <div ref={Modal => { this.Modal = Modal; }} id="modal2" className="modal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div>
              <h4>New Section</h4>
              <input placeholder="Title" ref="title" required={true} />
              <div className="input-field col s12 m6">

                <select className="browser-default icons" onChange={this.handleChange}>
                  <option value="" disabled defaultValue>Choose Section Type</option>
                  <option value="text" disabled >Text</option>
                  <option value="dreamboard" disabled >Dreamboard</option>
                  <option value="image">Images</option>
                </select>
                <br/>
                <a className="waves-effect waves-green btn-flat black"  onClick={this.toggleCardColor}>Choose Color</a>  
                {
                    this.state.isCardColor ? (
                      <div>
                        <SectionColor getColor={this.getColor}/>
                      </div>
                    ) :(null)
                }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>                    
            <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.addSection}>OK</a>
          </div>
        </div>

  		</div>
  	)
  }
}
export default AddSection;
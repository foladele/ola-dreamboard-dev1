import React from 'react';
import { connect } from 'react-redux';
import M from  'materialize-css/dist/js/materialize.min.js';

class AddSection extends React.Component {

	constructor(props) {
    super(props);
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

                <select className="browser-default icons">
                  <option value="" disabled selected>Choose Section Type</option>
                  <option value="text" disabled >Text</option>
                  <option value="dreamboard" disabled >Dreamboard</option>
                  <option value="image">Images</option>
                </select>
                <br/>
                <a className="waves-effect waves-green btn-flat black" >Choose Color</a>  

              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>                    
            <a href="#" className="modal-close waves-effect waves-green btn-flat">OK</a>
          </div>
        </div>

  		</div>
  	)
  }
}
export default AddSection;
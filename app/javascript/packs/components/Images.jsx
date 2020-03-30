import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import M from "materialize-css";
import { mdc_image_list__image_aspect_container, mdc_image_list__item, mdc_image_list__item_new } from '../stylesheets/imagestyles'


class Images extends React.Component {
  constructor(props) {
    super(props);
  }


  // }
  render() {
    //console.log(this.props.images)
    if(this.props.images.length > 0){
      return (
        <div>
          <p>Images</p>
        </div>
      )
    }else{
      return (
        <div>
          <div className="mdc-image-list my-image-list">
            <div className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                <p className="card-title grey-text center modal-trigger" data-target="imagemodal">Add Image</p>
              
              </div>
            </div>
          </div>
        </div>
      )
    }
    
  }
}
const mapStateToProps = (state) => {
  return{images: state.images}
}
export default connect(mapStateToProps)(Images);
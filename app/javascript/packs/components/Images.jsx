import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import M from "materialize-css";
import { mdc_image_list__image_aspect_container, mdc_image_list__item, mdc_image_list__item_new } from '../stylesheets/imagestyles'
import AddItems from './AddItems'
import { addImage, getSectionId } from '../components/actions';
// import {MDCList} from '@material/list';

// const list = new MDCList(document.querySelector('.mdc-list'));
// import "@material/image-list/mdc-image-list";
import Lightbox from 'react-lightbox-component';
import Gallery from 'react-grid-gallery';



class Images extends React.Component {
  constructor(props) {
    super(props);

    this.dispatchSectionId = this.dispatchSectionId.bind(this);
    this.state = { 
      sectionId: 0,
      images: []
    };
  }

  componentWillMount(){
     $.ajax({
        url: `/api/section/${this.props.id}/images`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
          //console.log("data ", data);
        }
      }).done( images => { 
          this.setState({ images });  
          
      })
  }

  dispatchSectionId(e)
  {
    e.preventDefault();
    this.props.getSectionId(this.props.id);
    //window.location.reload(false);

  }


  render() {
    //console.log("state image ", this.state.images);
    if(this.state.images.length > 0 ){

      let images = this.state.images.map(image => {
        image = image
        return (
          <li key={`image-${image.id}`} className="mdc-image-list__item " style={mdc_image_list__item}>
            <div className="mdc-image-list__image-aspect-container " style={mdc_image_list__image_aspect_container}>
              {/*<img className="mdc-image-list__image card-image" src={image.image}/>*/}
              <Lightbox images={[
                 {
                  src: `${image.image}`,
                  title: `${image.title}`,
                 }
                ]}
                thumbnailWidth='278px'
                thumbnailHeight='278px' 

              />
            </div>
            <div className="card-content">
              <span className="card-title black-text">{image.title}</span>
              <p>{image.description}</p>
              <a className="modal-close waves-effect waves-green btn-flat right" onClick={this.deleteItemImages}>Delete</a>
              <a className="modal-close waves-effect waves-green btn-flat right">Edit</a>
            </div>
          </li>
      )
      });

      return (
        <div>
          <div>
           <p className="center" style={{ position: 'relative'}} >
           { Boolean(this.state.images.length < 12) ? 
            (<i className="material-icons medium modal-trigger" data-target="imagemodal"  onClick={this.dispatchSectionId} >add_a_photo</i>) : (null)
           }
           </p>
           <br/>
            <ul className="mdc-image-list my-image-list row" >
              <div>{images}</div>
            </ul>
          </div>
          
        </div>
      )


    }else{
      return (
        <div>
          <div className="center" >
            <p><i className="material-icons medium modal-trigger" data-target="imagemodal"  onClick={this.dispatchSectionId} >add_a_photo</i></p>
          </div>
        </div>
      )
    }
    
  }
}
const mapStateToProps = (state) => {
  return{images: state.images}
}

const mapDispatchToProps = (dispatch) => {
  return{
    getSectionId: (id) => {dispatch(getSectionId(id))},
  }  
}
export default connect(mapStateToProps, mapDispatchToProps)(Images);




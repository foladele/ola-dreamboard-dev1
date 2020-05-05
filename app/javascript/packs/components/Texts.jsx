import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getSectionId} from '../components/actions';
import M from "materialize-css";
import { mdc_image_list__image_aspect_container, mdc_image_list__item, mdc_image_list__item_new } from '../stylesheets/imagestyles'
import Lightbox from 'react-lightbox-component';
import Gallery from 'react-grid-gallery';


class Texts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sectionId: this.props.id,
      texts: [],
    };

    this.dispatchSectionId = this.dispatchSectionId.bind(this);
  }

   componentWillMount(){
     $.ajax({
        url: `/api/section/${this.props.id}/texts`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
          // console.log(" text data", data);
        }
      }).done( texts => { 
          this.setState({ texts });  
          
      })
  }

  dispatchSectionId(e)
  {
    e.preventDefault();
    this.props.getSectionId(this.props.id);
    // this.props.getImageId(0);
  }

  render() {
    // console.log("text props: ", this.props);
    if(this.state.texts.length > 0 ){

      let lastTextIndex = this.state.texts.indexOf(this.state.texts.slice(-1)[0]) ;

      let texts = this.state.texts.map(text => {
        return(
          
            <li key={`text-${text.id}`} className="mdc-image-list__item card" style={mdc_image_list__item}>
              <div className="mdc-image-list__image-aspect-container card-image" 
              style={mdc_image_list__image_aspect_container}
              onClick={this.dispatchSectionId} >
                <Link to={`/api/section/${text.section_id}/texts/${text.id}`} className=" ">
                  <img className="mdc-image-list__image card-image" 
                  src="https://res.cloudinary.com/dzv3e4tm4/image/upload/v1588616633/blank-business-composition-computer-373076_rmrnj8.jpg"
                  />
                </Link>
                <div>
                { Boolean((this.state.texts.length < 12) && (localStorage.getItem('userId') !== null) && (this.state.texts.indexOf(text) === lastTextIndex)) ? 
                  (<div>
                    <a className="btn-floating halfway-fab waves-effect waves-light red">
                      <i className="material-icons medium modal-trigger" data-target="textModal"  onClick={this.dispatchSectionId} >rate_review</i>
                    </a>
                  </div>) :(null)
                }
                </div>
              </div>
              <div className="card-content">
                <span className="card-title black-text ">{text.title}</span>
               {/* <p>{image.description}</p>*/}
              </div>
              <div>
              {
                 Boolean(localStorage.getItem('userId') !== null) ? 
                 (<div className="card-action" onClick={this.dispatchSectionId}>
                    <a className="modal-close waves-effect waves-green btn-flat right" >Delete</a>
                    <Link to={`/api/section/${text.section_id}/texts/${text.id}`} className="waves-effect waves-green btn-flat right" >View</Link>
                  </div>): (null)
              }   
              </div>
            </li>
  
        )
      })
      return(
        <div>

          <div className="">
           <p className="center" style={{ position: 'relative'}} >
           { Boolean((this.state.texts.length < 12) && (localStorage.getItem('userId') !== null) ) ? 
            (<i className="material-icons medium modal-trigger" data-target="textModal"  onClick={this.dispatchSectionId} >rate_review</i>) : (null)
           }
           </p>
           <br/>
            <ul className="mdc-image-list my-image-list">
              <div className="col s12 m7" >
                {texts}
              </div>
            </ul>
          </div>
          
        </div>
      )
    }
    else{
      return (
      <div>
        <div className="center" >
          <p><i className="material-icons medium modal-trigger" data-target="textModal" onClick={this.dispatchSectionId}>rate_review</i></p>
        </div>
      </div>
    )
  }
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getSectionId: (id) => {dispatch(getSectionId(id))},
    // getTextId: (id) => {dispatch(getTextId(id))},
    // getImage: (image, images) => {dispatch(getImage(image, images))},
  }  
}

export default connect(null, mapDispatchToProps)(Texts);


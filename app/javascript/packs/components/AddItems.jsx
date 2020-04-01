import React, {useMemo} from 'react';
import { connect } from 'react-redux';
import M from  'materialize-css/dist/js/materialize.min.js';
import SectionColor from './SectionColor'
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";
import { mdc_image_list__image_aspect_container, mdc_image_list__item, mdc_image_list__item_new } from '../stylesheets/imagestyles'
import watch from 'redux-watch'
import { addImages, updateImage } from '../components/actions';
import Lightbox from 'react-lightbox-component';

class AddItems extends React.Component {

	constructor(props) {
    super(props);

    this.state = { 
      isCardColor: false,
      color: "fff",
      kind: "",
      sectionId: 0,
      acceptedFiles: [],
      images: [],
    };

    this.addSection = this.addSection.bind(this);
    this.toggleCardColor = this.toggleCardColor.bind(this);
    this.getColor = this.getColor.bind(this);
    this.addNewImage = this.addNewImage.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // console.log(" static nextProps: ", nextProps.state.sectionIdReducer.id)
    // console.log(" static prevState: ", prevState.sectionId)
   if(nextProps.state.sectionIdReducer.id !== prevState.sectionId){
    //console.log(" static newState: ", nextProps.state.sectionIdReducer.id)
     return { sectionId: nextProps.state.sectionIdReducer.id};
  }
  else return null;
}

componentDidUpdate(prevProps, prevState) {
   // console.log(" update prevProps: ", prevProps.state.sectionIdReducer)
   // console.log(" update prevState: ", this.props.state.sectionIdReducer)
  if(prevProps.state.sectionIdReducer!==this.props.state.sectionIdReducer){
    //console.log(" sectionIdReducer: ", prevProps.state.sectionIdReducer)
    this.setState({sectionId: this.props.state.sectionIdReducer});
    //console.log(" newState: ", this.state.sectionId)
    //this.classMethod();
  }
}

  componentDidMount() {
    // console.log("Reaching");
    const options = {
      onOpenStart: () => {
        // console.log("Open Start");
       
      },
      onOpenEnd: () => {
        // console.log("Open End");
         
      },
      onCloseStart: () => {
        // console.log("Close Start");
      },
      onCloseEnd: () => {
        // console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    M.Modal.init(this.Modal, options);   
    M.Modal.init(this.ImageModal, options); 

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

  onDrop(acceptedFiles)
  {
    this.setState({
        acceptedFiles
    });

    //console.log("this.state.files ", this.state.acceptedFiles)
    this.setState({ images: this.props.state.images });
    
    var binaryStr;
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";
    //console.log("reaching -0", acceptedFiles[0])

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      img.height = 150;
      fileList.appendChild(img);

      const reader = new FileReader();
      reader.onload = (function(aImg) 
      { return function(e) { 
          aImg.src = e.target.result;
        }; 
      })(img);
      
      reader.readAsDataURL(file);
      
    }

  }

  addNewImage(e)
  {
    //updated databse
    e.preventDefault();
    //console.log("new image? ", this.state.sectionId , " ", this.state.acceptedFiles)
    let id = this.state.sectionId
    let title = this.refs.imgTitle.value;;
    let description = this.refs.imagedes.value;
    let kind = "image"
    //console.log("item Images::: ", title,kind,description );

    this.state.acceptedFiles.map(img => {

      const fileData = new FormData();
      let image = img;
      fileData.append("image[image]", image);
      fileData.append("image[title]", title);
      fileData.append("image[description]", description);
      fileData.append("image[kind]", kind);

      //this.props.addImages(id,fileData)
      $.ajax({
         url: `/api/section/${id}/images`,
         type: 'POST',
         data: fileData,
         dataType: 'JSON',
         contentType: false,
         processData: false,
         cache: false,
         success: function (data) {
          console.log(data);
         },error: function (data) {  
          console.log(data);  
         }
       }).done(image => {
          console.log(image);
       })//end done

    })//end maping

    window.location.reload(false);
  }

  updateImage(image, images)
  {
    
    //console.log("new image? ", this.state.sectionId , " ", this.state.acceptedFiles)
    let id = image.id
    let sectionId = this.state.sectionId
    //let images = this.props.state.images
    let title = this.refs.imgTitle.value;
    if (title === ''){
      title = image.title
    }

    let description = this.refs.imagedes.value;
    if (description === ''){
      description = image.description
    }
    let kind = "image"
    //console.log("item Images::: ", title,kind,description );

    if (this.state.acceptedFiles.length > 0)
    {
      this.state.acceptedFiles.map(img => {

        const fileData = new FormData();
        let image = img;
        fileData.append("image[image]", image);
        fileData.append("image[title]", title);
        fileData.append("image[description]", description);
        fileData.append("image[kind]", kind);

        //this.props.updateImage(id, sectionId, fileData, images)
         $.ajax({
          url: `/api/section/${sectionId}/images/${id}`,
          type: 'PUT',
          data: fileData,
          dataType: 'JSON',
          contentType: false,
          processData: false,
          cache: false,
          success: function (data) {
           console.log(data);
          },error: function (data) {  
           console.log(data);  
          }
        }).done( image => {
          let editImage = images.find( i => i.id === image.id );
          editImage.title = image.title;
          editImage.color = image.color;
          editImage.collapse = image.collapse; 
          this.setState({ images: images });
          console.log(this.state.images);
        }).fail( msg => {
           alert(msg.errors);
        });

        })//end maping

    }else{

       const fileData = new FormData();
        let image = image.image;
        fileData.append("image[image]", image);
        fileData.append("image[title]", title);
        fileData.append("image[description]", description);
        fileData.append("image[kind]", kind);

        //this.props.updateImage(id, sectionId, fileData, images)
         $.ajax({
          url: `/api/section/${sectionId}/images/${id}`,
          type: 'PUT',
          data: fileData,
          dataType: 'JSON',
          contentType: false,
          processData: false,
          cache: false,
          success: function (data) {
           console.log(data);
          },error: function (data) {  
           console.log(data);  
          }
        }).done( image => {
          let editImage = images.find( i => i.id === image.id );
          editImage.title = image.title;
          editImage.color = image.color;
          editImage.collapse = image.collapse; 
          this.setState({ images: images });
        }).fail( msg => {
           alert(msg.errors);
        });

    }

    window.location.reload(true);
    // window.location.reload(true);
  }



  render(){

    //console.log("store ", this.props.state.sectionIdReducer);
    console.log("store ", this.props.state)

  	return(
  		<div>
  			{/*<p>Welcome to add section</p>*/}

         <div ref={Modal => { this.Modal = Modal; }} id="modal2" className="modal modal-fixed-footer">
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
                <a className="waves-effect waves-green btn-flat black white-text"  onClick={this.toggleCardColor}>Choose Color</a>  
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
            <a  className="modal-close waves-effect waves-green btn-flat">CANCEL</a>                    
            <a className="modal-close waves-effect waves-green btn-flat" onClick={this.addSection}>OK</a>
          </div>
        </div>
           {/*Add image here for higher component*/}
        <div>
          <div>
            <div ref={Modal => { this.ImageModal = Modal; }} id="imagemodal" className="modal modal-fixed-footer">
              <div className="modal-content">
                <h4 className="center">
                {Boolean(this.props.state.imageId.id > 0) ? (<div>Edit Image {this.state.sectionId}</div>) : (<div> New Image {this.state.sectionId}</div>)}
                </h4> 
                <div>
                {Boolean(this.props.state.imageId.id > 0) ? 
                  (<div><input placeholder={this.props.state.image.title} ref="imgTitle" required={true} /></div>) : 
                  (<div><input placeholder="Title" ref="imgTitle" required={true} /></div>)
                }
                </div>
                <div className="input-field col s12 m6">
                  <select className="browser-default icons" >
                    <option value="image" disabled defaultValue selected >Images</option>
                  </select>
                  <br/>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea id="textarea1" className="materialize-textarea" ref="imagedes"></textarea>
                      <label htmlFor="textarea1">
                      {Boolean(this.props.state.imageId.id > 0) ? 
                        (<div>{this.props.state.image.description}</div>) : 
                        (<div> Description</div>)
                      }
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="col s6">
                        <Dropzone onDrop={this.onDrop.bind(this)}
                          accept="image/*"  
                          >
                          {({getRootProps, getInputProps}) => (
                            <div className="container">
                              <div
                                {...getRootProps({
                                  className: 'dropzone',
                                  onDrop: event => event.stopPropagation(),
                                })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      <div className="col s6" id="fileList">
                        {Boolean(this.props.state.imageId.id > 0) ? 
                          (<div>
                            <Lightbox images={[
                               {
                                src: `${this.props.state.image.image}`,
                                title: `${this.props.state.image.title}`,
                               }
                              ]}
                              thumbnailWidth='225.38px'
                              thumbnailHeight='150px' 

                            />

                          </div>) : 
                          (<div><p>No files selected!</p></div>)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a className="modal-close waves-effect waves-green btn-flat">CANCEL</a>
                <div>
                {Boolean(this.props.state.imageId.id > 0) ? 
                  (<a className="modal-close waves-effect waves-green btn-flat" onClick={() => this.updateImage(this.props.state.image, this.props.state.images)}>UPDATE</a>) : 
                  (<a className="modal-close waves-effect waves-green btn-flat" onClick={this.addNewImage}>OK</a>)
                }
                </div>
                
              </div>
            </div>
          </div>
      </div>

  		</div>
  	)
  }
}

const mapStateToProps = (state) => {
  return{state}
}

const mapDispatchToProps = (dispatch) => {

  return{
    addImages: (id, fileData) => {dispatch(addImages(id, fileData))},
    updateImage: (id, sectionId, fileData, images) => {dispatch(updateImage(id, sectionId, fileData, images))},
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItems);

//export default AddItems;

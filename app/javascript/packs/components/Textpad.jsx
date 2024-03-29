import React from 'react';
import { AtomicBlockUtils, convertToRaw, Modifier, convertFromRaw, EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import ColorControls from './ColorControls';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";
import { connect } from 'react-redux';


const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  },
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media}/>;
};

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media}/>;
};

const Image = (props) => {
  return <img src={props.src} style={styles.media} alt="Example"/>;
};


const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();
  let media;
  if (type === 'audio') {
    media = <Audio src={src}/>;
  } else if (type === 'image') {
    media = <Image src={src}/>;
  } else if (type === 'video') {
    media = <Video src={src}/>;
  }
  return media;
};

const styles = {
  media: {
    width: '100%'
  }
};

class Textpad extends React.Component {

constructor(props) {
  super(props);
  this.state ={
    editorState: EditorState.createEmpty(),
    eidtTitle: false,
    textTitle: "Title?",
    showURLInput: false,
    url: '',
    urlType: '',
    urlValue: '',
    files: [],
  };

  this.onChange = this.onChange.bind(this);
  this.focus = () => this.refs.editor.focus();
  this.handleKeyCommand = this.handleKeyCommand.bind(this);
  this.saveContent = this.saveContent.bind(this);
  this.saveText = this.saveText.bind(this);
  this.getBlockStyle = this.getBlockStyle.bind(this);
  this.onTab = this.onTab.bind(this);
  this.eidtTitle = this.eidtTitle.bind(this);
  this.textTitle = this.textTitle.bind(this);
  this.addImage = this.addImage.bind(this);
  this.mediaBlockRenderer = this.mediaBlockRenderer.bind(this);
  this.confirm = this.confirm.bind(this);
  this.toggleColor = this.toggleColor.bind(this);

  this.toggleShowURLInputImage = this.toggleShowURLInputImage.bind(this);
  this.toggleShowURLInputVedio = this.toggleShowURLInputVedio.bind(this);
  this.toggleShowURLInputAudio = this.toggleShowURLInputAudio.bind(this);

  // session - component did mount
  // const content = window.sessionStorage.getItem('content');

  // if (content) {
  //   this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  //   console.log('content-2 state', convertFromRaw(JSON.parse(content)));
  // } else {
  //   this.state.editorState = EditorState.createEmpty();
  // }
  
}

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview))
  }

  componentDidMount() {

    //Get text with Ajax


    const options = {
      onOpenStart: () => { 
      },
      onOpenEnd: () => {   
      },
      onCloseStart: () => {
      },
      onCloseEnd: () => {
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    M.Modal.init(this.TextModal, options);

  }


handleKeyCommand(command, editorState){

  const newState = RichUtils.handleKeyCommand(editorState, command);

  if(newState){
    this.onChange(newState);
    return "handled"
  }

  return "non-handled"
}

onChange = (editorState) => {

  const contentState = editorState.getCurrentContent();
  this.saveContent(contentState);
  this.setState({editorState});
}

saveContent(content){

  window.sessionStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  // console.log('content', JSON.stringify(convertToRaw(content)));

}

saveText(e){
  e.preventDefault();
  const contentState = this.state.editorState.getCurrentContent();
  console.log('content', JSON.stringify(convertToRaw(contentState)));

  let id = this.props.state.sectionIdReducer.id
  let title = this.state.textTitle;
  let textContent = JSON.stringify(convertToRaw(contentState));
  let kind = "text"

  const fileData = new FormData();

  fileData.append("text[title]", title);
  fileData.append("text[kind]", kind);
  fileData.append("text[content]", textContent);

  $.ajax({
     url: `/api/section/${id}/texts`,
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
   }).done(texts => {
      console.log(texts);
   })//end done

   if (contentState) {
      this.state.editorState = EditorState.createEmpty();
    }
  }

onTab(e) {
    // e.preventDefault();
    // alert("reaching onTab!!!")
    console.log("event code", e.keyCode);
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

 toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

toggleInlineStyle(inlineStyle) {
    //cosole.log("inlineStyle: ", inlineStyle);
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

getBlockStyle(block) {
  // console.log("block: ", block.getType());
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    case 'code-block':
      return 'card card-title card-content';
    case 'center':
      return 'center';
    default:
      return null;
  }
}

toggleColor(toggledColor)
{
  // alert('yay toggledColor');
  const {editorState} = this.state;
  const selection = editorState.getSelection();
  // Let's just allow one color at a time. Turn off all active colors.
  const nextContentState = Object.keys(styleMap)
    .reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, editorState.getCurrentContent());
  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'change-inline-style'
  );
  const currentStyle = editorState.getCurrentInlineStyle();
  // Unset style override for current color.
  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce((state, color) => {
      return RichUtils.toggleInlineStyle(state, color);
    }, nextEditorState);
  }
  // If the color is being toggled on, apply it.
  if (!currentStyle.has(toggledColor)) {
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledColor
    );
  }
  this.onChange(nextEditorState);
}

toggleShowURLInputImage()
{
  //console.log("image" );
  this.setState({
    showURLInput: true,
    urlType: 'image'
  });
}

toggleShowURLInputVedio()
{
 
  //console.log("video" );
  this.setState({
    showURLInput: true,
    urlType: 'video'
  });
}

toggleShowURLInputAudio()
{
  //console.log("audio" );
  this.setState({
    showURLInput: true,
    urlType: 'audio'
  });
}

promptForMedia(type, src){

  // console.log("src: ", src);
  // console.log(" state src: ", this.state.urlValue);
  this.setState({
      showURLInput: true,
      urlValue: src,
      urlType: type
    });

}

confirm(e)
{
  e.preventDefault();
    const {editorState, urlValue, urlType} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
      showURLInput: false,
      urlValue: ''
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
}

addImage(acceptedFiles)
{
  // console.log(this.state.urlType);
  let type = this.state.urlType;
  this.setState({
      files: acceptedFiles
  });
  
  var binaryStr;
  const mediaFileList = document.getElementById("mediaFileList");
  mediaFileList.innerHTML = "";
  console.log("reaching -0", acceptedFiles[0])
  for (let i = 0; i < acceptedFiles.length; i++) {

    console.log("reaching -i times", acceptedFiles[i]);

    const file = acceptedFiles[i];

    //setting type of media
    let media;
    let mediaEle;
    if (type === 'audio') {
      // console.log('audio');
      media = 'audio';
      mediaEle  = 'audio';
    } else if (type === 'image') {
      // console.log('image');
      media = 'image';
      mediaEle  = 'img';
    } else if (type === 'video') {
      // console.log('video');
      media = 'video';
      mediaEle  = 'video';
    }

    const mediaType = document.createElement(mediaEle);
    mediaType.classList.add("obj");
    mediaType.file = file;
    mediaType.height = 250;
    mediaFileList.appendChild(mediaType);

    const reader = new FileReader();
    reader.onload = (function(aFile) 
    { return function(e) { 
        aFile.src = e.target.result;
        this.setState({
          urlValue: aFile.src
        });
        this.promptForMedia(media, aFile.src);
      }; 
    })(mediaType).bind(this);
    
    reader.readAsDataURL(file);
    const saveBtn = document.createElement("button");
    const sbr = document.createElement("br");
    mediaFileList.appendChild(sbr);
    saveBtn.innerHTML = "Save";
    saveBtn.onclick = this.confirm;
    mediaFileList.appendChild(saveBtn);
    
  }
}

eidtTitle()
{
   this.setState({ eidtTitle: !this.state.eidtTitle });
}

textTitle(){
  let title = this.refs.title.value;
  this.setState({ textTitle: title });
}

mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return { component: Media, editable: false };
  }
  return null;
}

 render() {
  // console.log("Textpad state ", this.props.state);
  let selectionId = this.props.state.sectionIdReducer.id;
  const {files} = this.state;
    return (
      <div>
        <div ref={Modal => { this.TextModal = Modal; }} id="textModal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div className="container">
              <div className="RichEditor-root">
                {
                  this.state.eidtTitle ? 
                  (<div>
                    <button className="right" onClick={this.eidtTitle}>Save</button>
                    <h1 className="center" style={{ padding: "10px", border: "1px solid #ddd"}}>
                      <input placeholder="Title" ref="title" required={true} onChange={this.textTitle}/>
                    </h1>

                  </div>) 
                  : 
                  (<div>
                    <h4 className="center" style={{ padding: "10px", border: "1px solid #ddd"}} onClick={this.eidtTitle}>{this.state.textTitle}</h4>
                  </div>)
                }
                    <BlockStyleControls
                      editorState={this.state.editorState}
                      onToggle={this.toggleBlockType.bind(this)}
                    />
                    <InlineStyleControls
                      editorState={this.state.editorState}
                      onToggle={this.toggleInlineStyle.bind(this)}
                    />
                    <ColorControls
                      editorState={this.state.editorState}
                      onToggle={this.toggleColor}
                    />
                    <div className="row icon-container">

                      <div className="icon-preview col s6 m3" onMouseDown={this.toggleShowURLInputImage}>
                        <i className="material-icons small">add_a_photo</i>
                        <span>add image </span>
                      </div>

                      <div className="icon-preview col s6 m3" onMouseDown={this.toggleShowURLInputVedio}>
                        <i className="material-icons small">video_call</i>
                        <span>add video</span>
                      </div>

                      <div className="icon-preview col s6 m3" onMouseDown={this.toggleShowURLInputAudio}>
                        <i className="material-icons small">audiotrack</i>
                        <span>add audio</span>
                      </div>
                      
                    </div>
                    {
                      this.state.showURLInput ? 
                      (
                        <div className="row">
                          <div className="col s12">
                            <div className="col s6">
                              <Dropzone onDrop={this.addImage}>
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
                              <div  className="col s6" id="mediaFileList">
                                <p>No files selected!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : 
                      (null)
                    }

                    <div className = 'RichEditor-editor' style={{ padding: "10px", border: "1px solid #030a05"}}>
                      <Editor
                        blockRendererFn={this.mediaBlockRenderer}
                        editorState={this.state.editorState}
                        blockStyleFn={this.getBlockStyle}
                        customStyleMap={styleMap}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        onTab={this.onTab}
                        ref="editor"
                        placeholder="Enter some text..."
                        spellCheck={true}
                      />
                    </div>
              </div>
            </div>


          </div>
          <div className="modal-footer">
            <a href="" className="modal-close waves-effect waves-green btn-flat">cancel</a>
            <a href="" className="modal-close waves-effect waves-green btn-flat" onClick={this.saveText}>ok</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{state}
}

export default connect(mapStateToProps)(Textpad);

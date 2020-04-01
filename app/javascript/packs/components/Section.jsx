
import React from 'react';
import { Link } from 'react-router';
import FreeScrollBar from 'react-free-scrollbar';
import { AppRegistry, StyleSheet, Text, View } from 'react-native-web';
import SectionColor from './SectionColor'
import { connect } from 'react-redux';
import Images from './Images'
import Texts from './Texts'
import Dreamboards from './Dreamboards'
// import { getImages } from '../components/actions';



class Section extends React.Component {

	constructor(props) {
    super(props);

    this.state = { 
      bStyle: {
        minHeight: '400px',
        height: 'auto',
        width: '100%',
        backgroundColor: `${this.props.color}`,
      },
      fStyle: {
        minHeight: '400px',
        height: '400px',
        width: '100%',
        backgroundColor: `${this.props.color}`,
      },
      testBC:{
        color:  `${this.props.color}`,
      },
      sectionStyle: {
        color:  `${this.props.color}` + '!important',
        textColor: 'black',
        width: '100%',
      },

      isCardColor: false,
      editSection: false, 
      isCollapse: this.props.collapse,
      color: `${this.props.color}`, 
    };

    this.editSection = this.editSection.bind(this);
    this.toggleEditSection = this.toggleEditSection.bind(this);
    this.toggleCardColor = this.toggleCardColor.bind(this);
    this.getColor = this.getColor.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    //console.log("section components: ", this.props);

  }

   editSection(e){
     
     e.preventDefault();
     let id = this.props.id;
     if (this.state.editSection === true)
     {
       this.setState({ editSection: !this.state.editSection });
     }

     let title = this.refs.newTitle.value;
     let color = this.state.color;
     let collapse = this.props.collapse;
     let kind = this.props.kind;
     if(title.length === 0)
     {
       
        title = this.props.title
     }
     let section = {title: title, color: color, collapse: collapse, kind: kind};
     this.props.update(id, section);
     
  }

  toggleEditSection(){
     this.setState({ editSection: !this.state.editSection }); 
  }

  toggleCardColor(){
    this.setState({ isCardColor: !this.state.isCardColor })
  }

  toggleCollapse(){
  	
    let collapse = !this.props.collapse
    let section = {title: this.props.title, color: this.props.color, collapse: collapse, kind: this.props.kind};
    this.props.update(this.props.id, section);
    // this.setState({ isCollapse: collapse })
  }

  getColor(color) {
  	console.log(color);
    this.setState({ color: color });  
  }

  deleteSection(e)
  {
  	e.preventDefault();
  	this.props.deleteSection(this.props.id);
  }

  render(){

  	let style = document.createElement('style');
	  style.type = 'text/css';
	  style.innerHTML = `.grey-${this.props.id} {
	    background-color: ${this.props.color};
	  }`;
	  document.getElementsByTagName('head')[0].appendChild(style);

	  let className = `card grey-${this.props.id}`;
	  let bottomCard = `card-content black-text grey-${this.props.id}`;

    return(
      <div>
        <div className={className} style={this.state.sectionStyle}>
        	<div className="card-action black-text">
        		<span className="card-title">{this.props.title }</span>
        		<a className="right">
        		{Boolean(this.props.firstSectionIndex !== this.props.yourIndex) ? (<div onClick={this.deleteSection}>delete</div>): (null)}
        		</a>
        		<a className=" right" onClick={this.toggleEditSection}>Edit</a>
        		<a className="right" onClick={this.toggleCollapse}>
              {Boolean(this.props.collapse) ? (<div>expand</div>): (<div>collapse</div>)}
            </a>
            {
            	Boolean(this.state.editSection) ? (
            		<div className="">
            			<input placeholder={this.props.title} ref="newTitle" required={true} />
            			<div className="input-field col s12 m6">
                    <select className="browser-default icons">
                      <option value={this.props.kind} disabled selected>{this.props.kind}</option>
                    </select>
                  </div>
                  <div className="input-field col s12 m6">
                    <select className="browser-default icons">
                      <option value="public" disabled selected >public</option>
                      <option value="private" disabled >private</option>
                    </select>
                  </div>
                  <a className="waves-effect waves-green btn-flat black" onClick={this.toggleCardColor}>Choose Color</a>  
                  {
                  	this.state.isCardColor ? (
                  		<div>
                        <SectionColor getColor={this.getColor}/>
                      </div>
                  	) :(null)
                  }
                  <div className=" right">
                   <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.editSection}>SAVE</a>
                  </div>
            		</div>
            	) : (null)
            }

            <a className=" right">
              {Boolean(this.props.kind === "image") ? (<i className="material-icons">image</i>) : 
              (<div>{Boolean(this.props.kind === "dreamboard") ? 
                (<i className="material-icons">dashboard</i>) : 
                (<i className="material-icons">textsms</i>)}
               </div>
              )
              }
            </a>

        	</div>
        	<div>
        	{ 

        		Boolean(this.props.collapse) ? (null):(
        			<div className={bottomCard} style={this.state.fStyle}>
        				<FreeScrollBar>
        					<View className="center">
        						{
        							Boolean(this.props.kind === 'image') ?
        							(<div>
        								<Images id={this.props.id}  />
        						   </div>) : 
        							(<div>
        								{Boolean(this.props.kind === 'text') ? 
        								 	(<div>
        								 		 <Texts id={this.props.id}/>
        								 		</div>) :
        								 	(<div>
        								 		<Dreamboards id={this.props.id}/>
        								 	 </div>)
        								 }
        						  	</div>
        							)
        						}
        					</View>
        				</FreeScrollBar>
        			</div>
        		)	
        	}
        	<div>
        	{
        		Boolean(this.props.sectionLength >= 10) ? 
        		(
        			<div>{
        				this.props.lastSectionIndex === this.props.yourIndex ? (
			        			<div className="card-action">
				        			<div className={bottomCard}>
				        				<a className="left" >Previous</a>
				                <a className="right" >Next</a>
				        			</div>
				        		</div>
			        	 ) : (null)

        		}</div>
        		) : (null)
        	}
        	</div>
        	</div>
        </div>
      </div>
    )
  }

}

export default Section;






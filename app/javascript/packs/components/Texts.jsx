import React from 'react';

class Texts extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <div className="center" >
          <p><i className="material-icons medium modal-trigger" data-target="textModal">rate_review</i></p>
        </div>
      </div>
    )
  }
}

export default Texts;
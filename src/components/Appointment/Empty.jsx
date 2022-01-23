import React from 'react';

function Empty(props) {

  return (
    <main className="appointment__add">
      <img 
        className="appointment__add-button"
        src="images/add.png"
        alt="add" 
        onClick={props.onAdd}
      />
    </main>
  );
}

export default Empty;
import React from 'react';

const Overlay = (props) => {
  return (
    <div
      className="p-fixed t-0 b-0 l-0 r-0 z-80 flex flex-center flex-middle"
      style={{ backgroundColor: 'rgba(0,0,0,.4)' }}
    >
      {props.children}
    </div>
  );
}

export default Overlay;
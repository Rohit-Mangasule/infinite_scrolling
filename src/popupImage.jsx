import { useState, useRef } from 'react';
import React from 'react';
import Tippy from '@tippyjs/react';
import './popupImage.css'; 

const PopupImageRenderer = (props) => {
  const tippyRef = useRef();
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const onClickHandler = () => {
    hide();
  };

  const imagePopupContent = (
    <div className="image-container">
      <img
        src={props.value}
        alt="Poster"
        className="popup-image"
        onClick={onClickHandler}
      />
    </div>
  );

  return (
    <Tippy
      ref={tippyRef}
      content={imagePopupContent}
      visible={visible}
      onClickOutside={hide}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="right"
    >
      <img
        src={props.value}
        alt="Thumbnail"
        className="poster-container"
        onClick={visible ? hide : show}
      />
    </Tippy>
  );
};

export default PopupImageRenderer;

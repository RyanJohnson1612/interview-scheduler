import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   const buttonText = props.children;
   const buttonClasses = classNames("button", {
      'button--confirm': props.confirm, 'button--danger': props.danger 
   });

   return (
      <button 
         className={buttonClasses} 
         onClick={props.onClick} 
         disabled={props.disabled}
      >
         {buttonText}
      </button>
   );
}

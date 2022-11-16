import './Button.scss';
import React from 'react';


// uses the folling props:
// text: the text inside the button
// type: optional, pass a value of 'submit' if using this in a form
// btnType: this is used to style the button, must be one of the following: 'primary' 'secondary' 'cancel' 'edit'
// iconOnly: true or false, if you button should be just an icon on mobile
// clickHandler: function that is run onClick
export default function Button({text, type, btnType, iconOnly, clickHandler}) {
    let className = 'btn';
    if (btnType) className += ' btn--' + btnType;
    let icon;
    if (btnType === 'edit') icon = <span className="material-icons btn__icon">edit</span>;

    return (
        <button className={className} type={type} onClick={clickHandler}>
            {icon}
            <span className={iconOnly ? 'btn__text--icon-only' : ''}>{text}</span>
        </button>
    );
}
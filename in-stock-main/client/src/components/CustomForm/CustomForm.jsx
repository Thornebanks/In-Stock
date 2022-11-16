import "./CustomForm.scss";
import React, { createRef } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import ErrorIcon from "../../assets/Icons/error-24px.svg";

function ErrorEl() {
  return (
    <p className="error-el">
      <img className="error-el__img" src={ErrorIcon} alt="error-icon" /> This
      field is required
    </p>
  );
}

class CustomForm extends React.Component {
  formEl = createRef();

  componentDidMount() {
    this.wrapItems();
  }

    wrapItems = () => {
        const formItems = Array.from(ReactDOM.findDOMNode(this.formEl.current).getElementsByClassName('custom-form__el'));
        formItems.forEach((item) => {
            const itemWrapper = document.createElement("div");
            itemWrapper.classList.add("custom-form__group"); 
            item.parentElement.replaceChild(itemWrapper, item);

      const errorMsg = document.createElement("p");
      errorMsg.classList.add("custom-form__error");
      errorMsg.innerHTML = ReactDOMServer.renderToStaticMarkup(<ErrorEl />);

      itemWrapper.appendChild(item);
      itemWrapper.appendChild(errorMsg);
    });
  };

  validateForm = (e, fn) => {
    let canSubmit = false;

    e.preventDefault();
    const formItems = Array.from(
      ReactDOM.findDOMNode(this.formEl.current).getElementsByClassName(
        "custom-form__el"
      )
    );
    formItems.forEach((item) => {
      if (!item.value) {
        item.setAttribute("data-cansubmit", false);
        item.parentElement.getElementsByClassName(
          "custom-form__error"
        )[0].style.display = "block";
        item.style.borderColor = "#c94515";
      } else {
        item.setAttribute("data-cansubmit", true);
        item.parentElement.getElementsByClassName(
          "custom-form__error"
        )[0].style.display = "none";
        item.style.borderColor = "#bdc5d5";
      }
    });

        canSubmit = formItems.every(item => item.dataset.cansubmit ==="true")

        if (canSubmit) {
            fn(e);
        }
    }

  render() {
    return (
      <form
        className={this.props.className}
        ref={this.formEl}
        onSubmit={(e) => {
          this.validateForm(e, this.props.onSubmitHandler);
        }}
      >
        {this.props.children}
      </form>
    );
  }
}

export default CustomForm;

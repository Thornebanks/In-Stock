import axios from "axios";
import React from "react";
import Button from "../../components/Button/Button";
import CustomForm from "../../components/CustomForm/CustomForm";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./AddWarehouse.scss";

function addWarehouse(props) {
  function addNewWarehouse(event) {
    axios
      .post("http://localhost:4200/warehouses", {
        name: event.target.Name.value,
        address: event.target.Address.value,
        city: event.target.City.value,
        country: event.target.Country.value,
        contactName: event.target.ContactName.value,
        position: event.target.Position.value,
        phone: event.target.Number.value,
        email: event.target.Email.value,
      })
      .then(() => {
        alert("Added New Warehouse");
        props.history.push('/warehouses');
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className="add-warehouse">
      <PageHeader
        title="Add New Warehouse"
        goBack={props.history ? props.history : null}
      />
      <CustomForm
        className="add-warehouse__form"
        onSubmitHandler={(e) => addNewWarehouse(e)}
      >
        <div className="add-warehouse__form-inputfields">
          <div className="add-warehouse__form-section add-warehouse__form-section--left">
            <h2 className="add-warehouse__form-title">Warehouse Details</h2>

            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="name">
                Warehouse Name
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="text"
                name="Name"
                id="name"
                placeholder="Warehouse Name"
                data-cansubmit={false}
              />
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="address">
                Street Address
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="text"
                name="Address"
                id="address"
                placeholder="Street Address"
                data-cansubmit={false}
              />
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="city">
                City
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="text"
                name="City"
                id="city"
                placeholder="City"
                data-cansubmit={false}
              />
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="country">
                Country
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="text"
                name="Country"
                id="country"
                placeholder="Country"
                data-cansubmit={false}
              />
            </div>
          </div>

          <div className="add-warehouse__form-section add-warehouse__form-section--right">
            <h2 className="add-warehouse__form-title">Contact Details</h2>

            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="cname">
                Contact Name
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="text"
                name="ContactName"
                id="cname"
                placeholder="Contact Name"
                data-cansubmit={false}
              />
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="cposition">
                Position
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="text"
                name="Position"
                id="cposition"
                placeholder="Position"
                data-cansubmit={false}
              />
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="cphone">
                Phone Number
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="tel"
                name="Number"
                id="cphone"
                placeholder="Phone Number"
                data-cansubmit={false}
              />
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__form-label" htmlFor="cemail">
                Email
              </label>
              <input
                className="add-warehouse__form-input custom-form__el"
                type="email"
                name="Email"
                id="cemail"
                placeholder="Email"
                data-cansubmit={false}
              />
            </div>
          </div>
        </div>

        <div className="add-warehouse__form-footer">
          <Button
            type="button"
            btnType="secondary"
            text="Cancel"
            clickHandler={() => {
              props.history.goBack();
            }}
          />
          <Button type="submit" btnType="primary" text="+ Add Warehouse" />
        </div>
      </CustomForm>
    </section>
  );
}

export default addWarehouse;

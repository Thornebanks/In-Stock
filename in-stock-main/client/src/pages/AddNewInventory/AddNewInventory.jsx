import axios from "axios";
import React from "react";
import Button from "../../components/Button/Button";
import CustomForm from "../../components/CustomForm/CustomForm";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./AddNewInventory.scss";
import { v4 } from "uuid";

class AddNewInventory extends React.Component {
  state = {
    warehouseList: null,
    quantityItem: 0,
    quantity: 1,
    inStock: false,
  };

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    const list = (await axios.get(`http://localhost:4200/warehouses/`)).data;
    this.setState({
      warehouseList: list,
      quantity: 1,
      inStock: true,
    });
  }

  postInventory = ({ target }) => {
    const item = {
      warehouseID: target.warehouse.value,
      warehouseName:
        target.warehouse.options[target.warehouse.selectedIndex].text,
      itemName: target.name.value,
      description: target.description.value,
      category: target.category.value,
      status: target.status.value,
      quantity: this.state.inStock ? target.quantity.value : 0,
    };

    axios.post(`http://localhost:4200/inventories/}`, item).then(() => {
      alert("New Inventory Item Added");
      this.props.history.push("/inventories");
    });
  };

  changeNumInput = (e) => {
    if (e.target.value.match(/^[1-9]\d*$/) || e.target.value === "") {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  changeStatus = (e) => {
    this.setState({
      inStock: e.target.value === "In Stock",
    });
  };

  render() {
    const { inStock, quantity, warehouseList } = this.state;
    return (
      <section className="add-inventory">
        <PageHeader
          title="Add New Inventory Item"
          goBack={this.props.history ? this.props.history : null}
        />
        <CustomForm
          className="add-inventory__form"
          onSubmitHandler={this.postInventory}
        >
          <div className="add-inventory__form-inputfields">
            <div className="add-inventory__form-section add-inventory__form-section--left">
              <h2 className="add-inventory__form-title">Item Details</h2>

              <div className="add-inventory__form-group">
                <label className="add-inventory__form-label" htmlFor="name">
                  Item Name
                </label>
                <input
                  className="add-inventory__form-input custom-form__el"
                  type="text"
                  id="name"
                  placeholder="Item Name"
                  data-cansubmit={false}
                />
              </div>
              <div className="add-inventory__form-group">
                <label className="add-inventory__form-label" htmlFor="address">
                  Description
                </label>
                <textarea
                  className="add-inventory__form-input custom-form__el"
                  type="text"
                  id="description"
                  placeholder="Please enter a brief item description"
                  data-cansubmit={false}
                />
              </div>
              <div className="edit-inventory__form-group">
                <label
                  className="edit-inventory__form-label"
                  htmlFor="category"
                >
                  Category
                </label>
                <select className="edit-inventory__form-dropdown" name="category" id="category">
                  {[
                    "Accessories",
                    "Apparel",
                    "Electronics",
                    "Gear",
                    "Health",
                  ].map((v) => (
                    <option key={v4()} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="add-inventory__form-section add-inventory__form-section--right">
              <h2 className="add-inventory__form-title">Item Availability</h2>

              <div className="edit-inventory__form-group">
                <p className="edit-inventory__form-label">Status</p>
                <div className="edit-inventory__form-radioContainer">
                  <div className="edit-inventory__form-inStock">
                    <input
                      type="radio"
                      id="contactChoice1"
                      name="status"
                      value="In Stock"
                      checked={inStock}
                      onChange={this.changeStatus}
                    />
                    <label className="edit-inventory__form-radioLabel" htmlFor="contactChoice1">In stock</label>
                  </div>
                  <div className="edit-inventory__form-outStock">
                    <input
                      type="radio"
                      id="contactChoice2"
                      name="status"
                      value="Out of Stock"
                      checked={!inStock}
                      onChange={this.changeStatus}
                    />
                    <label className="edit-inventory__form-radioLabel" htmlFor="contactChoice2">Out of stock</label>
                  </div>
                </div>
              </div>
              
              <div
                className={
                  "edit-inventory__form-group edit-inventory__form-group--qty" +
                  (inStock ? "" : " edit-inventory__form-group--hidden")
                }
              >
                <label
                  className="edit-inventory__form-label"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  className="edit-inventory__form-input custom-form__el"
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={this.changeNumInput}
                  data-cansubmit={false}
                />
              </div>
              <div className="edit-inventory__form-group">
                <label
                  className="edit-inventory__form-label"
                  htmlFor="warehouse"
                >
                  Warehouse
                </label>
                <select  className="edit-inventory__form-dropdown" name="warehouse" id="warehouse">
                  {warehouseList &&
                    warehouseList.map((w) => (
                      <option key={v4()} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="add-inventory__form-footer">
            <Button
              btnType="secondary"
              text="Cancel"
              type="button"
              clickHandler={() => {
                this.props.history.goBack();
              }}
            />
            <Button type="submit" btnType="primary" text="+ Add Item" />
          </div>
        </CustomForm>
      </section>
    );
  }
}

export default AddNewInventory;

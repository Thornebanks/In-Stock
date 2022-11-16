import React from 'react';
import axios from 'axios';
import Button from '../../components/Button/Button';
import CustomForm from '../../components/CustomForm/CustomForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import './EditInventory.scss';
import { v4 } from 'uuid';

class EditInventory extends React.Component {
    state = {
        warehouseList: null,
        inventoryItem: null,
        name: '',
        description: '',
        quantity: 1,
        inStock: false
    };

    componentDidMount() {
        this.initialize();
    }

    async initialize() {
        const item = (await axios.get(`http://localhost:4200/inventories/${this.props.match.params.id}`)).data;
        const list = (await axios.get(`http://localhost:4200/warehouses/`)).data;
        this.setState({
            warehouseList: list,
            inventoryItem: item,
            name: item.itemName,
            quantity: item.quantity === 0 ? 1 : item.quantity,
            description: item.description,
            inStock: item.quantity !== 0
        });
    }

    putInventory = ({target}) => {
        const item = {
            warehouseID: target.warehouse.value,
            warehouseName: target.warehouse.options[target.warehouse.selectedIndex].text,
            itemName: target.name.value,
            description: target.description.value,
            category: target.category.value,
            status: target.status.value,
            quantity: this.state.inStock ? target.quantity.value : 0
        };

        axios.put(`http://localhost:4200/inventories/${this.props.match.params.id}`, item).then(() => {
            alert("Inventory Item Updated");
            this.props.history.push('/inventories');
        });
    };

    changeTextInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeNumInput = (e) => {
        if (e.target.value.match(/^[1-9]\d*$/) || e.target.value === '') {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    changeStatus = (e) => {
        this.setState({
            inStock: e.target.value === 'In Stock'
        });
    };

    render() {
        const {name, description, inventoryItem, inStock, quantity} = this.state;
        return (
            <section className="edit-inventory">
                <PageHeader title="Edit Inventory Item" goBack={this.props.history ? this.props.history : null}/>
                <CustomForm className="edit-inventory__form" onSubmitHandler={this.putInventory}>
                    <div className="edit-inventory__form-inputfields">
                        <div className="edit-inventory__form-section edit-inventory__form-section--left">
                            <h2 className="edit-inventory__form-title">Item Details</h2>

                            <div className="edit-inventory__form-group">
                                <label className="edit-inventory__form-label" htmlFor="name">Item Name</label>
                                <input className="edit-inventory__form-input custom-form__el" type="text" id="name"
                                       name="name"
                                       onChange={this.changeTextInput}
                                       value={name}
                                       placeholder="Item Name" data-cansubmit={false}/>
                            </div>
                            <div className="edit-inventory__form-group">
                                <label className="edit-inventory__form-label" htmlFor="description">Description</label>
                                <textarea className="edit-inventory__form-input custom-form__el"
                                          id="description" name="description"
                                          value={description}
                                          onChange={this.changeTextInput}
                                          placeholder="Please enter a short description"
                                          data-cansubmit={false}></textarea>
                            </div>
                            <div className="edit-inventory__form-group">
                                <label className="edit-inventory__form-label" htmlFor="category">Category</label>
                                <select className="edit-inventory__form-dropdown" name="category" id="category">

                                    {['Accessories', 'Apparel', 'Electronics', 'Gear', 'Health'].map(v =>
                                        <option key={v4()} defaultValue={inventoryItem && inventoryItem.category === v}
                                                value={v}>{v}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="edit-inventory__form-section edit-inventory__form-section--right">
                            <h2 className="edit-inventory__form-title">Item Availability</h2>

                            <div className="edit-inventory__form-group">
                                <p className="edit-inventory__form-label">Status</p>
                                <div className="edit-inventory__form-radioContainer">
                                    <div className="edit-inventory__form-inStock">
                                        <input type="radio" id="contactChoice1"
                                               name="status" value="In Stock"
                                               checked={inStock}
                                               onChange={this.changeStatus}/>
                                        <label className="edit-inventory__form-radioLabel" htmlFor="contactChoice1">In
                                            stock</label>
                                    </div>

                                    <div className="edit-inventory__form-outStock">
                                        <input type="radio" id="contactChoice2"
                                               name="status" value="Out of Stock"
                                               checked={!inStock}
                                               onChange={this.changeStatus}/>
                                        <label className="edit-inventory__form-radioLabel" htmlFor="contactChoice2">Out
                                            of stock</label>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={'edit-inventory__form-group edit-inventory__form-group--qty' + (inStock ? '' : ' edit-inventory__form-group--hidden')}>
                                <label className="edit-inventory__form-label" htmlFor="quantity">Quantity</label>
                                <input className="edit-inventory__form-input custom-form__el" type="text"
                                       id="quantity"
                                       name="quantity"
                                       value={quantity}
                                       onChange={this.changeNumInput}
                                       data-cansubmit={false}/>
                            </div>
                            <div className="edit-inventory__form-group">
                                <label className="edit-inventory__form-label" htmlFor="warehouse">Warehouse</label>
                                <select className="edit-inventory__form-dropdown" name="warehouse" id="warehouse">
                                    {this.state.warehouseList && this.state.warehouseList.map(w =>
                                        <option key={v4()} defaultValue={inventoryItem && inventoryItem.warehouseName === w.name}
                                                value={w.id}>{w.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="edit-inventory__form-footer">
                        <Button btnType="secondary" text="Cancel" clickHandler={() => {
                            this.props.history.push('/inventories')
                        }}/>
                        <Button type="submit" btnType="primary" text="Save"/>
                    </div>
                </CustomForm>
            </section>
        );
    }
}

export default EditInventory;
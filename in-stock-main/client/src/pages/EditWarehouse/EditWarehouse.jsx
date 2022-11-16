import axios from 'axios';
import React from 'react';
import './EditWarehouse.scss';
import CustomForm from '../../components/CustomForm/CustomForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';

class editWarehouse extends React.Component {
    state = {
        name: '',
        address: '',
        city: '',
        country: '',
        contactName: '',
        position: '',
        number: '',
        email: ''
    };

    componentDidMount() {
        this.initialize();
    }

    async initialize() {
        const warehouse = (await axios.get(`http://localhost:4200/warehouses/${this.props.match.params.id}`)).data;
        this.setState({
            name: warehouse.name,
            address: warehouse.address,
            city: warehouse.city,
            country: warehouse.country,
            contactName: warehouse.contact.name,
            position: warehouse.contact.position,
            number: warehouse.contact.phone,
            email: warehouse.contact.email
        });
    }

    changeTextInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    putWarehouse = ({target}) => {
        const warehouse = {
            name:  target.name.value,
            address: target.address.value,
            city:  target.city.value,
            country: target.country.value,
            contactName: target.contactName.value,
            position: target.position.value,
            number: target.number.value,
            email: target.email.value
        };

        axios.put(`http://localhost:4200/warehouses/${this.props.match.params.id}`, warehouse).then(() => {
            alert("Warehouse Updated");
            this.props.history.push('/warehouses');
        });
    };

    render() {
        const {name, address, city, country, contactName, position, number, email} = this.state;
        return (
            <section className="edit-warehouse">
                <PageHeader
                    title="Edit Warehouse"
                    goBack={this.props.history ? this.props.history : null}
                />
                <CustomForm
                    className="edit-warehouse__form"
                    onSubmitHandler={this.putWarehouse}
                >
                    <div className="edit-warehouse__form-inputfields">
                        <div className="edit-warehouse__form-section edit-warehouse__form-section--left">
                            <h2 className="edit-warehouse__form-title">Warehouse Details</h2>

                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="name">
                                    Warehouse Name
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.changeTextInput}
                                    value={name}
                                    placeholder="Warehouse Name"
                                    data-cansubmit={false}
                                />
                            </div>
                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="address">
                                    Street Address
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="text"
                                    name="address"
                                    id="address"
                                    onChange={this.changeTextInput}
                                    value={address}
                                    placeholder="Street Address"
                                    data-cansubmit={false}
                                />
                            </div>
                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="city">
                                    City
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={this.changeTextInput}
                                    value={city}
                                    placeholder="City"
                                    data-cansubmit={false}
                                />
                            </div>
                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="text"
                                    name="country"
                                    id="country"
                                    onChange={this.changeTextInput}
                                    value={country}
                                    placeholder="Country"
                                    data-cansubmit={false}
                                />
                            </div>
                        </div>

                        <div className="edit-warehouse__form-section edit-warehouse__form-section--right">
                            <h2 className="edit-warehouse__form-title">Contact Details</h2>

                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="cname">
                                    Contact Name
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="text"
                                    name="contactName"
                                    id="cname"
                                    onChange={this.changeTextInput}
                                    value={contactName}
                                    placeholder="Contact Name"
                                    data-cansubmit={false}
                                />
                            </div>
                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="cposition">
                                    Position
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="text"
                                    name="position"
                                    id="cposition"
                                    onChange={this.changeTextInput}
                                    value={position}
                                    placeholder="Position"
                                    data-cansubmit={false}
                                />
                            </div>
                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="cphone">
                                    Phone Number
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="tel"
                                    name="number"
                                    id="cphone"
                                    onChange={this.changeTextInput}
                                    value={number}
                                    placeholder="Phone Number"
                                    data-cansubmit={false}
                                />
                            </div>
                            <div className="edit-warehouse__form-group">
                                <label className="edit-warehouse__form-label" htmlFor="cemail">
                                    Email
                                </label>
                                <input
                                    className="edit-warehouse__form-input custom-form__el"
                                    type="email"
                                    name="email"
                                    id="cemail"
                                    onChange={this.changeTextInput}
                                    value={email}
                                    placeholder="Email"
                                    data-cansubmit={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="edit-warehouse__form-footer">
                        <Button btnType="secondary" text="Cancel" clickHandler={() => {
                            this.props.history.push('/warehouses');
                        }}/>
                        <Button type="submit" btnType="primary" text="Save"/>
                    </div>
                </CustomForm>
            </section>
        );
    }
}

export default editWarehouse;

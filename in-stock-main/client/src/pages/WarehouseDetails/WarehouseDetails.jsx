import axios from 'axios';
import React from 'react';
import Button from '../../components/Button/Button';
import BackIcon from '../../assets/Icons/arrow_back-24px.svg';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import PageLoader from '../../components/PageLoader/PageLoader';
import Table, { Sort } from '../../components/Table/Table';
import InventoryRow from '../../components/InventoryRow/InventoryRow';
import './WarehouseDetails.scss';
import { v4 } from 'uuid';

export default class WarehouseDetails extends React.Component {
    state = {
        inventories: null,
        deleteModal: null,
        warehouse: null
    };

    componentDidMount() {
        this.initialize();
    }

    initialize = async () => {
        const inventories = await this.getInventoryItems();
        const warehouse = await this.getWarehouse(this.props.match.params.id);
        this.setState({inventories: inventories, warehouse: warehouse});
    };

    getInventoryItems = async () => (await axios.get(`${process.env.REACT_APP_API_URL}/warehouses/${this.props.match.params.id}/inventories`)).data;

    showDeleteModal = (name, id) => {
        this.setState({
            deleteModal: <DeleteModal type="inventory" item={name} cancelHandler={this.clearModal}
                                      deleteHandler={() => {
                                          this.deleteInventoryItem(id);
                                      }}
            />
        });
    };

    clearModal = () => {
        this.setState({
            deleteModal: null
        });
    };

    deleteInventoryItem = async id => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/inventories/${id}`);
        this.setState({
            inventories: (await this.getInventoryItems()),
            deleteModal: null
        });
    };

    getWarehouse = async id => {
        return (await axios.get(`${process.env.REACT_APP_API_URL}/warehouses/${id}`)).data;
    };

    render() {
        const {inventories, warehouse, deleteModal} = this.state;

        if (inventories) {
            const {id, address, city, country, name, contact: {name: contactName, position, phone, email}} = warehouse;
            return (
                <section className="warehouse-details">
                    {deleteModal && deleteModal}
                    <div className="page-header">
                        <img className="page-header__back" src={BackIcon} alt="back" onClick={this.props.history.goBack}/>
                        <h1 className="page-header__title">{name}</h1>
                        <Button type="button" btnType="edit" text="Edit" iconOnly={true} clickHandler={() => {
                            this.props.history.push(`/warehouses/${id}/edit`);
                        }}/>
                    </div>
                    <div className="warehouse-details__wrapper">
                        <div className="warehouse-details__top">
                            <h4 className="warehouse-details__label">Warehouse Address:</h4>
                            <p className="body-medium">{address},</p>
                            <p className="body-medium">{city}, {country}</p>
                        </div>
                        <div className="warehouse-details__bottom">
                            <div className="warehouse-details__group">
                                <h4 className="warehouse-details__label">Contact name:</h4>
                                <p className="body-medium">{contactName}</p>
                                <p className="body-medium">{position}</p>
                            </div>
                            <div className="warehouse-details__group">
                                <h4 className="warehouse-details__label">Contact Information:</h4>
                                <p className="body-medium">{phone}</p>
                                <p className="body-medium">{email}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Table listItems={inventories.map(item => <InventoryRow item={item} key={v4()} onEdit={() => {
                            this.props.history.push(`/inventories/${item.id}/edit`);
                        }} onDelete={() => {
                            this.showDeleteModal(item.itemName, item.id);
                        }}/>)}
                               headerItems={
                                   <>
                                       {['Inventory Item', 'Category', 'Status', 'Qty'].map((text, i) =>
                                           <p className="table__header-item" key={v4()}>{text} <Sort position={i} /> </p>)}
                                       <p className="table__header-item table__header-item--action">Actions</p>
                                   </>
                               }
                        />
                    </div>
                </section>
            );
        } else {
            return <PageLoader/>;
        }
    }
}
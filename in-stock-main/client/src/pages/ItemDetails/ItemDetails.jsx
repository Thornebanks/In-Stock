import React from 'react';
import BackIcon from '../../assets/Icons/arrow_back-24px.svg';
import './ItemDetails.scss';
import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag'
import axios from 'axios';
import PageLoader from '../../components/PageLoader/PageLoader';

class ItemDetails extends React.Component {
    itemID = this.props.match.params.id;

    state = {
        itemData: null
    }

    componentDidMount() {
        axios
        .get(`${process.env.REACT_APP_API_URL}/inventories/${this.itemID}`)
        .then((response) => {
            this.setState({itemData: response.data});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render () {
        if(this.state.itemData) {
            return (
                <section className="item-details">
                    <div className="page-header">
                        <img className="page-header__back" src={BackIcon} alt="back" onClick={this.props.history.goBack}/>
                        <h1 className="page-header__title">{this.state.itemData.itemName}</h1>
                        <Button type="button" btnType="edit" text="Edit" iconOnly={true} clickHandler={() => {
                            this.props.history.push(`/inventories/${this.itemID}/edit`);
                        }}/>
                    </div>
                    <div className="item-data">
                        <div className="item-data__container">
                            <div className="item-data__group">
                                <label className="item-data__title">Item Description:</label>
                                <p className="item-data__value body-medium">{this.state.itemData.description}</p>
                            </div>
                            <div className="item-data__group">
                                <label className="item-data__title">Category:</label>
                                <p className="item-data__value body-medium">{this.state.itemData.category}</p>
                            </div>
                        </div>
                        <div className="item-data__container item-data__container--wrap">
                            <div className="item-data__group item-data__group--wrap">
                                <label className="item-data__title">Status:</label>
                                <br/>
                                <span className="item-data__value body-medium"><Tag text={this.state.itemData.status} isGreen={this.state.itemData.status === 'In Stock'} /></span>
                            </div>
                            <div className="item-data__group item-data__group--wrap">
                                <label className="item-data__title">Quantity:</label>
                                <p className="item-data__value body-medium">{this.state.itemData.quantity}</p>
                            </div>
                            <div className="item-data__group item-data__group--wrap">
                                <label className="item-data__title">Warehouse:</label>
                                <p className="item-data__value body-medium">{this.state.itemData.warehouseName}</p>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return <PageLoader />
        }
    }
}

export default ItemDetails;
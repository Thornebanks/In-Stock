import React from 'react';
import DeleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import EditIcon from '../../assets/Icons/edit-24px.svg';
import {ActionItems} from '../Table/Table';
import Tag from '../Tag/Tag';
import TextLink from '../TextLink/TextLink';

export default function InventoryRow({item, showWarehouse, onEdit, onDelete}) {
    return (
        <div className="table__list">
            <span className="table__list-item" data-searchable={true}><TextLink text={item.itemName} href={'/inventories/'+item.id}/></span>
            <span className="table__list-item"><p className="body-medium">{item.category}</p></span>
            <span className="table__list-item"><Tag text={item.status} isGreen={item.status === 'In Stock'}/></span>
            <span className="table__list-item"><p className="body-medium">{item.quantity}</p></span>
            {showWarehouse && <span className="table__list-item"><p className="body-medium">{item.warehouseName}</p></span>}
            <span className="table__list-item table__list-item--actions"><ActionItems items={
                <>
                    <span onClick={onDelete}><img src={DeleteIcon} alt="delete"/></span>
                    <span onClick={onEdit}><img src={EditIcon} alt="edit"/></span>
                </>
            }/></span>
        </div>
    );
}
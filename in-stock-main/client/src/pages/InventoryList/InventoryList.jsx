import axios from "axios";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import InventoryRow from "../../components/InventoryRow/InventoryRow";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import PageLoader from "../../components/PageLoader/PageLoader";
import Searchbar from "../../components/Searchbar/Searchbar";
import React, { Component, createRef } from "react";
import Table, { Sort } from "../../components/Table/Table";
import { v4 } from "uuid";

export default class InventoryList extends Component {
  table = createRef();

  state = {
    inventories: null,
    deleteModal: null,
    warehouse: null,
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = async () => {
    const inventories = await this.getInventoryItems();
    this.setState({ inventories: inventories });
  };

  getInventoryItems = async () =>
    (await axios.get(`${process.env.REACT_APP_API_URL}/inventories`)).data;

  showDeleteModal = (name, id) => {
    this.setState({
      deleteModal: (
        <DeleteModal
          type="inventory"
          item={name}
          cancelHandler={this.clearModal}
          deleteHandler={() => {
            this.deleteInventoryItem(id);
          }}
        />
      ),
    });
  };

  clearModal = () => {
    this.setState({
      deleteModal: null,
    });
  };

  deleteInventoryItem = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/inventories/${id}`);
    this.setState({
      inventories: await this.getInventoryItems(),
      deleteModal: null,
    });
  };

  render() {
    const { inventories, deleteModal } = this.state;

    if (inventories) {
      return (
        <section className="">
          {deleteModal && deleteModal}
          <PageHeader title="Inventory" noBorder={true}>
            <Searchbar placeholder="Search..." table={this.table} />
            <Button
              type="button"
              btnType="primary"
              text="+ Add New Item"
              clickHandler={() => {
                this.props.history.push("/inventories/addnew");
              }}
            />
          </PageHeader>
          <div>
            <Table
              ref={this.table}
              listItems={inventories.map((item) => (
                <InventoryRow
                  item={item}
                  showWarehouse={true}
                  key={v4()}
                  onEdit={() => {
                    this.props.history.push(`/inventories/${item.id}/edit`);
                  }}
                  onDelete={() => {
                    this.showDeleteModal(item.itemName, item.id);
                  }}
                />
              ))}
              headerItems={
                <>
                  {[
                    "Inventory Item",
                    "Category",
                    "Status",
                    "Qty",
                    "Warehouse",
                  ].map((text, i) => (
                    <p key={v4()} className="table__header-item">
                      {text} <Sort position={i} />{" "}
                    </p>
                  ))}
                  <p className="table__header-item table__header-item--action">
                    Actions
                  </p>
                </>
              }
            />
          </div>
        </section>
      );
    } else {
      return <PageLoader />;
    }
  }
}

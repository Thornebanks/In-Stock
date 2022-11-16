import "./WarehouseList.scss";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Table, { ActionItems, Sort } from "../../components/Table/Table";
import EditIcon from "../../assets/Icons/edit-24px.svg";
import DeleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import React, { createRef } from "react";
import axios from "axios";
import PageLoader from "../../components/PageLoader/PageLoader";
import PageHeader from "../../components/PageHeader/PageHeader";
import TextLink from "../../components/TextLink/TextLink";
import Searchbar from "../../components/Searchbar/Searchbar";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

class WarehouseList extends React.Component {
  table = createRef();

  state = {
    warehouseList: null,
    deleteModal: null,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/warehouses`)
      .then((response) => {
        this.setState({ warehouseList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getWarehouses = async () =>
    (await axios.get(`${process.env.REACT_APP_API_URL}/warehouses`)).data;

  deleteWarehouse = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/warehouses/${id}`);
    this.setState({
      warehouseList: await this.getWarehouses(),
      deleteModal: null,
    });
  };

  showDeleteModal = (name, id) => {
    this.setState({
      deleteModal: (
        <DeleteModal
          type="warehouse"
          item={name}
          cancelHandler={this.clearModal}
          deleteHandler={() => {
            this.deleteWarehouse(id);
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

  render() {
    const { deleteModal } = this.state;

    if (this.state.warehouseList !== null) {
      return (
        <section className="warehouse-list">
          {deleteModal && deleteModal}
          <PageHeader title="Warehouses" noBorder={true}>
            <Searchbar placeholder="Search..." table={this.table} />
            <Button
              type="button"
              btnType="primary"
              text="+ Add New Warehouse"
              clickHandler={() => {
                this.props.history.push(`/warehouses/addnew`);
              }}
            />
          </PageHeader>
          <div className="warehouses">
            <Table
              ref={this.table}
              headerItems={
                <>
                  <p className="table__header-item">
                    Warehouse <Sort position={0} />
                  </p>
                  <p className="table__header-item">
                    Address <Sort position={1} />
                  </p>
                  <p className="table__header-item">
                    Contact Name <Sort position={2} />
                  </p>
                  <p className="table__header-item">
                    Contact Information <Sort position={3} />
                  </p>
                  <p className="table__header-item table__header-item--action">
                    Actions
                  </p>
                </>
              }
              listItems={
                <>
                  {this.state.warehouseList.map((item) => {
                    return (
                      <div className="table__list" key={v4()}>
                        <span
                          className="table__list-item"
                          data-searchable={true}
                        >
                          <p className="body-medium warehouse-item">
                            <TextLink
                              text={item.name}
                              href={`/warehouses/${item.id}`}
                            />
                          </p>
                        </span>
                        <span className="table__list-item">
                          <p className="body-medium warehouse-item">
                            {item.address}, {item.city}, {item.country}
                          </p>
                        </span>
                        <span className="table__list-item">
                          <p className="body-medium warehouse-item">
                            {item.contact.name}
                          </p>
                        </span>
                        <span className="table__list-item">
                          <p className="body-medium warehouse-item">
                            {item.contact.phone} <br /> {item.contact.email}
                          </p>
                        </span>
                        <span className="table__list-item table__list-item--actions">
                          <ActionItems
                            items={
                              <>
                                <span
                                  onClick={() => {
                                    this.showDeleteModal(item.name, item.id);
                                  }}
                                >
                                  <img
                                    className=""
                                    src={DeleteIcon}
                                    alt="delete"
                                  />
                                </span>
                                <Link to={"warehouses/" + item.id + "/edit"}>
                                  <span>
                                    <img
                                      className=""
                                      src={EditIcon}
                                      alt="edit"
                                    />
                                  </span>
                                </Link>
                              </>
                            }
                          />
                        </span>
                      </div>
                    );
                  })}
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

export default WarehouseList;

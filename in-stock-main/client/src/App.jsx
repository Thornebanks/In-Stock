import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import EditInventory from "./pages/EditInventory/EditInventory";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import InventoryList from "./pages/InventoryList/InventoryList";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import Footer from "./components/Footer/Footer";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import AddWarehouse from "./pages/AddWarehouse/AddWarehouse";
import AddNewInventory from "./pages/AddNewInventory/AddNewInventory";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <Redirect to="/warehouses" />
            </Route>
            <Route
              path="/warehouses"
              exact
              render={(routerProps) => <WarehouseList {...routerProps} />}
            />
            <Route
              path="/warehouses/addnew"
              exact
              render={(routerProps) => <AddWarehouse {...routerProps} />}
            />
            <Route
              path="/warehouses/:id"
              exact
              render={(routerProps) => <WarehouseDetails {...routerProps} />}
            />
            <Route
              path="/warehouses/:id/edit"
              exact
              render={(routerProps) => <EditWarehouse {...routerProps} />}
            />
            <Route
              path="/inventories"
              exact
              render={(routerProps) => <InventoryList {...routerProps} />}
            />
            <Route
              path="/inventories/addnew"
              exact
              render={(routerProps) => <AddNewInventory {...routerProps} />}
            />
            <Route
              path="/inventories/:id"
              exact
              render={(routerProps) => <ItemDetails {...routerProps} />}
            />
            <Route
              path="/inventories/:id/edit"
              exact
              render={(routerProps) => <EditInventory {...routerProps} />}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../views/Home/Home";
import AddStore from "../views/Store/AddStore";
import StoreList from "../views/Store/StoreList";
import SupplierWarehouse from "../views/Warehouse/SupplierWarehouse";
import SupplierWarehouseList from "../views/Warehouse/SupplierWarehouseList";
import AddMissingItem from "../views/MissingItems/AddMissingItem";
import AddMissingItemList from "../views/MissingItems/AddMissingItemList";
import AddASINUPC from "../views/ASINUPC/AddASINUPC";
import AddASINUPCList from "../views/ASINUPC/AddASINUPCList";
import AddShippedItem from "../views/ReadyToShipped/AddShippedItem";
import AddedShippedItemList from "../views/ReadyToShipped/AddedShippedItemList";
import Stock from "../views/Home/Stock";
import TotalShipped from "../views/Home/TotalShipped";
import MissingItemsSolved from "../views/Home/MissingItemsSolved";
import CurrentSell from "../views/Home/CurrentSell";
import LastSell from "../views/Home/LastSell";
import AuthLayout from "../layout/AuthLayout";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import AddWarehouseToCustomer from "../views/Customer/AddWarehouseToCustomer";
import AddWarehouseToCustomerList from "../views/Customer/AddWarehouseToCustomerList";
import AddPriceAvarageTax from "../views/PriceAvarageTax/AddPriceAvarageTax";
import { PriceAvrageTaxList } from "../views/PriceAvarageTax/PriceAvrageTaxList";
import ActiveStores from "../views/Home/ActiveStores";
import InactiveStores from "../views/Home/InactiveStores";
import EditStore from "../views/Store/EditStore";
import EditAsin from "../views/ASINUPC/EditAsin";
import EditSupplierWarehouse from "../views/Warehouse/EditSupplierWarehouse";
import EditCustomer from "../views/Customer/EditCustomer";
import EditMissing from "../views/MissingItems/EditMissing";
import StoreManagerRoute from "../hoc/StoreManagerRoute";
import WareHouseManagerRoute from "../hoc/WareHouseManagerRoute";
import Search from "../components/Search";
import ReadyToShipped from "../views/Home/ReadyToShipped";
import OutOfStock from "../views/Home/OutOfStock";
import EditStock from "../views/Home/EditStock";
import ReturnedList from "../views/Home/ReturnedList";
import EditReturnedList from "../views/Home/EditReturnedList";
import Returned from "../views/Home/Returned";
import SuperAdminRoute from "../hoc/SuperAdminRoute";
import AddWarehouse from "../views/AddWarehouse/AddWarehouse";

// const navmenus = [
//     { name: 'Dashboard', icon: <AiOutlineAppstore className='inline' />, navigate: "/" },
//     { name: 'Store', icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <GrAdd />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },
//     { name: 'Warehouse', icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <GrAdd />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },
//     { name: 'Missing Items', icon: <SlMagnifierRemove className='inline' />, subitems: [{ name: "Add missing item", icon: <GrAdd />, navigate: "/add-missing-item" }, { name: "Missing item list", icon: <FaClipboardList />, navigate: "/add-missing-item-list" },] },
//     { name: 'ASIN/UPC', icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <GrAdd />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },
//     { name: 'Ready to shipped', icon: <FaShippingFast className='inline' />, subitems: [{ name: "Add shipped item", icon: <GrAdd />, navigate: "/add-shipped-item" }, { name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] }
// ];

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/stocks", element: <Stock /> },
            { path: "/stocks/:id", element: <EditStock /> },
            { path: "/total-shipped", element: <TotalShipped /> },
            { path: "/missing-items-solved", element: <MissingItemsSolved /> },
            { path: "/current-month-sell", element: <CurrentSell /> },
            { path: "/last-month-sell", element: <LastSell /> },
            { path: "/ready-to-shipped", element: <ReadyToShipped /> },
            { path: "/out-of-stock", element: <OutOfStock /> },
            { path: "/add-store", element: <StoreManagerRoute><AddStore /></StoreManagerRoute> },
            { path: "/store-list", element: <StoreList /> },
            { path: "/store-list/:id", element: <EditStore /> },
            { path: "/returned-list", element: <ReturnedList /> },
            { path: "/returned-list/:id", element: <EditReturnedList /> },
            { path: "/returned", element: <Returned /> },
            {
                path: "/add-warehouse", element:
                    <SuperAdminRoute>
                        <AddWarehouse />
                    </SuperAdminRoute>
            },
            { path: "/supplier-warehouse", element: <StoreManagerRoute><SupplierWarehouse /></StoreManagerRoute> },
            { path: "/supplier-warehouse-list", element: <SupplierWarehouseList /> },
            { path: "/supplier-warehouse-list/:id", element: <EditSupplierWarehouse /> },
            // { path: "/add-missing-item", element: <AddMissingItem /> },
            { path: "/add-missing-item-list", element: <AddMissingItemList /> },
            { path: "/add-missing-item-list/:id", element: <EditMissing /> },
            { path: "/add-asin-upc", element: <StoreManagerRoute><AddASINUPC /></StoreManagerRoute> },
            { path: "/add-asin-upc-list", element: <AddASINUPCList /> },
            { path: "/add-asin-upc-list/:id", element: <EditAsin /> },
            // { path: "/add-shipped-item", element: <WareHouseManagerRoute><AddShippedItem /></WareHouseManagerRoute> },
            // { path: "/added-shipped-item-list", element: <AddedShippedItemList /> },
            { path: "/add-warehouse-to-customer", element: <StoreManagerRoute><AddWarehouseToCustomer /></StoreManagerRoute> },
            { path: "/add-warehouse-to-customer-list", element: <AddWarehouseToCustomerList /> },
            { path: "/add-warehouse-to-customer-list/:id", element: <EditCustomer /> },
            { path: "/add-price-avarage-tax", element: <StoreManagerRoute><AddPriceAvarageTax /></StoreManagerRoute> },
            // { path: "/price-avarage-tax-list", element: <PriceAvrageTaxList /> },
            { path: "/active-stores", element: <ActiveStores /> },
            { path: "/inactive-stores", element: <InactiveStores /> },
            { path: "/search", element: <Search /> }
        ],

    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [{
            path: "login",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />
        }
        ]
    }
]);
export default router;

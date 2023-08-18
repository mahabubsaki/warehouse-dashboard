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
            { path: "/total-shipped", element: <TotalShipped /> },
            { path: "/missing-items-solved", element: <MissingItemsSolved /> },
            { path: "/current-month-sell", element: <CurrentSell /> },
            { path: "/last-month-sell", element: <LastSell /> },
            { path: "/add-store", element: <AddStore /> },
            { path: "/store-list", element: <StoreList /> },
            { path: "/supplier-warehouse", element: <SupplierWarehouse /> },
            { path: "/supplier-warehouse-list", element: <SupplierWarehouseList /> },
            { path: "/add-missing-item", element: <AddMissingItem /> },
            { path: "/add-missing-item-list", element: <AddMissingItemList /> },
            { path: "/add-asin-upc", element: <AddASINUPC /> },
            { path: "/add-asin-upc-list", element: <AddASINUPCList /> },
            { path: "/add-shipped-item", element: <AddShippedItem /> },
            { path: "/added-shipped-item-list", element: <AddedShippedItemList /> },
        ]
    },
]);
export default router;

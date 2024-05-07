import React, { useRef, useState, ReactNode } from "react";
import { Badge } from "primereact/badge";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { GoHome } from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";
import { TbWheel } from "react-icons/tb";
import { TbFileInvoice } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import { useAppDispatch } from "@/config/store.ts";
import { logout } from "@/shared/reducers/authentication.ts";

type MainLayoutProps = {
  children: ReactNode;
  pageName?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageName }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuOptions = [
    { name: "Favorites", value: 0 },
    { name: "Apps", value: 1 },
  ];

  const [selectedMenuOption, setSelectedMenuOption] = useState(0);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login');
  };

  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const btnRef4 = useRef(null);
  const btnRef5 = useRef(null);

  return (
    <div className="min-h-screen flex relative lg:static surface-ground">
      <div
        id="app-sidebar-1"
        className="bg-bluegray-900 h-screen hidden lg:block flex-shrink-0 fixed left-0 top-0 z-10 select-none"
        style={{ width: "250px" }}
      >
        <div className="flex flex-column h-full">
          <div
            className="flex align-items-center px-5 bg-bluegray-900 flex-shrink-0"
            style={{ height: "60px" }}
          >
            <p className="text-bluegray-100">CarServify</p>
          </div>
          <div className="overflow-y-auto mt-3">
            <ul className="list-none p-3 m-0">
              <li>
                <Link
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  to="/"
                >
                  <GoHome className="mr-2" />
                  <span className="font-medium">Dashboard</span>
                  <Ripple />
                </Link>
              </li>
              <li>
                <StyleClass
                  nodeRef={btnRef1}
                  selector="@next"
                  enterClassName="hidden"
                  enterActiveClassName="slidedown"
                  leaveToClassName="hidden"
                  leaveActiveClassName="slideup"
                >
                  <a
                    ref={btnRef1}
                    className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  >
                    <MdMiscellaneousServices className="mr-2" />
                    <span className="font-medium">Services</span>
                    <i className="pi pi-chevron-down ml-auto mr-1"></i>
                    <Ripple />
                  </a>
                </StyleClass>
                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                  <li>
                    <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                      <li>
                        <a
                          className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                            transition-duration-150 transition-colors w-full"
                        >
                          <i className="pi pi-table mr-2"></i>
                          <span className="font-medium">Services</span>
                          <Ripple />
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                    transition-duration-150 transition-colors w-full"
                      to="/booking"
                    >
                      <span className="font-medium">Bookings</span>
                      <span
                        className="inline-flex align-items-center justify-content-center ml-auto bg-red-400 text-white font-medium border-circle"
                        style={{ minWidth: "1.5rem", height: "1.5rem" }}
                      >
                        3
                      </span>

                      <Ripple />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                    transition-duration-150 transition-colors w-full"
                      to="/service-list"
                    >
                      <span className="font-medium">Service List</span>
                      <Ripple />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                    transition-duration-150 transition-colors w-full"
                      to="/service-inventory"
                    >
                      <span className="font-medium">Inventory</span>
                      <Ripple />
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  to="/customers"
                >
                  <i className="pi pi-users mr-2"></i>
                  <span className="font-medium">Customers</span>
                  <Ripple />
                </Link>
              </li>
              <li>
                <Link
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  to="/parts"
                >
                  <TbWheel className="mr-2" />
                  <span className="font-medium">Parts</span>
                  <Ripple />
                </Link>
              </li>
              <li>
                <Link
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  to="/calendar"
                >
                  <i className="pi pi-calendar mr-2"></i>
                  <span className="font-medium">Calendar</span>
                  <Ripple />
                </Link>
              </li>
              <li>
                <Link
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  to="/invoices"
                >
                  <TbFileInvoice className="mr-2" />
                  <span className="font-medium">Invoices</span>
                  <Ripple />
                </Link>
              </li>
              <li>
                <Link
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
                transition-duration-150 transition-colors w-full"
                  to="/warranty-policies"
                >
                  <MdSecurity className="mr-2" />
                  <span className="font-medium">Warranty Policies</span>
                  <Ripple />
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto mx-3">
            <hr className="mb-3 border-top-1 border-bluegray-600" />
            <ul className="list-none p-2 m-0 hidden">
              <li>
                <a
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
            transition-duration-150 transition-colors w-full"
                >
                  <i className="pi pi-cog mr-2"></i>
                  <span className="font-medium">Settings</span>
                  <Ripple />
                </a>
              </li>
              <li>
                <a
                  className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50
            transition-duration-150 transition-colors w-full"
                >
                  <i className="pi pi-sign-out mr-2"></i>
                  <span className="font-medium" onClick={handleSignOut}>
                    Sign Out
                  </span>
                  <Ripple />
                </a>
              </li>
            </ul>
            <StyleClass
              nodeRef={btnRef3}
              selector="@prev"
              enterClassName="hidden"
              enterActiveClassName="fadein"
              leaveToClassName="hidden"
              leaveActiveClassName="fadeout"
            >
              <a
                ref={btnRef3}
                className="p-ripple my-3 px-3 py-2 flex align-items-center hover:bg-bluegray-900 border-round cursor-pointer text-bluegray-100 hover:text-bluegray-50
        transition-duration-150 transition-colors w-full"
              >
                <span className="font-medium">Manager</span>
                <i className="pi pi-chevron-up ml-auto"></i>
                <Ripple />
              </a>
            </StyleClass>
          </div>
        </div>
      </div>
      <div
        className="min-h-screen flex flex-column relative flex-auto"
        style={{ marginLeft: "250px" }}
      >
        <div
          className="flex justify-content-between align-items-center px-5 surface-section  relative lg:static border-bottom-1 surface-border"
          style={{ height: "60px" }}
        >
          <div className="flex">
            {pageName && <span className="ml-3 font-medium">{pageName}</span>}
            <StyleClass
              nodeRef={btnRef4}
              selector="#app-sidebar-1"
              enterClassName="hidden"
              enterActiveClassName="fadeinleft"
              leaveToClassName="hidden"
              leaveActiveClassName="fadeoutleft"
              hideOnOutsideClick
            >
              <a
                ref={btnRef4}
                className="p-ripple cursor-pointer block lg:hidden text-700 mr-3"
              >
                <i className="pi pi-bars text-4xl"></i>
                <Ripple />
              </a>
            </StyleClass>
          </div>

          <StyleClass
            nodeRef={btnRef5}
            selector="@next"
            enterClassName="hidden"
            enterActiveClassName="fadein"
            leaveToClassName="hidden"
            leaveActiveClassName="fadeout"
            hideOnOutsideClick
          >
            <a
              ref={btnRef5}
              className="p-ripple cursor-pointer block lg:hidden text-700"
            >
              <i className="pi pi-ellipsis-v text-2xl"></i>
              <Ripple />
            </a>
          </StyleClass>

          <ul
            className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
          >
            <li>
              <a
                className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge">
                  <Badge severity="danger" />
                </i>
                <span className="block lg:hidden font-medium">
                  Notifications
                </span>
                <Ripple />
              </a>
            </li>
          </ul>
        </div>
        <div className="p-5 flex flex-column flex-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

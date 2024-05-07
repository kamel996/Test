import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainLayout from '@/shared/layout/MainLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Tag } from 'primereact/tag';

import { GrServices } from "react-icons/gr";
import { TbSteeringWheel } from "react-icons/tb";
import { TbCash } from "react-icons/tb";

import StatCard from '@/shared/components/StatCard';
import { ServiceBooking, bookings } from '@/shared/constants/bookings';
import Slideover from '@/shared/components/Slideover';
import Rescheduler from '@/shared/components/Rescheduler';


const Dashboard = () => {

  const [date, setDate] = useState<Date | null>(null);
  const menu1 = useRef<Menu | null>(null);
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);

  const items = [
    {
      label: 'Actions',
      items: [
        { label: "View", icon: "pi pi-fw pi-eye", command: () => setIsSlideoverVisible(true) },
        { label: "Reschedule", icon: "pi pi-fw pi-clock", command: () => setIsReschedulerVisible(true) },

      ],
    },
  ];

  const closeSlideover = () => {
    setIsSlideoverVisible(false);
  };

  const [isReschedulerVisible, setIsReschedulerVisible] = useState(false);

 
  const [statuses] = useState(['New', 'Ongoing', 'Pending', 'Cancelled']);

  const getSeverity = (status: string) => {
    switch (status) {
        case 'Cancelled':
            return 'danger';

        case 'New':
            return 'success';

        case 'Ongoing':
            return 'info';

        case 'Pending':
            return 'warning';
    }
};

const statusBodyTemplate = (rowData: ServiceBooking) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
};

const formatDate = (value: string | Date) => {
  return new Date(value).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};



  
  return (
    <MainLayout pageName="Dashboard">
 
    <h3 className="text-bluegray-400 font-semibold">Overview</h3>
  
    <div className="grid">
    
        <StatCard
  outerBgColor="bg-blue-100"
  innerBgColor="bg-blue-500"
  number={345}
  title="Service Bookings"
  percentage="+5.1%"
  statIcon={<GrServices size={22} />}
/>
<StatCard
  outerBgColor="bg-orange-100"
  innerBgColor="bg-orange-500"
  number={45}
  title="Parts Sold"
  percentage="-3.2%"
  statIcon={<TbSteeringWheel size={22} />}
/>

<StatCard
  outerBgColor="bg-teal-100"
  innerBgColor="bg-teal-500"
  number={124800}
  title="Total Invoice"
  percentage="5.1%"
  statIcon={<TbCash size={22} />}
  isPrice={true}
/>
    </div>

    <div className="grid">
        <div className="col-12 lg:col-8 p-2">
        <div className="flex justify-content-between">
        <h3 className="text-bluegray-400 font-semibold">Recent Bookings</h3>
        <button aria-label="Primary" className="p-button p-component p-button-text">
        <span className="p-button-label p-c">See all Bookings</span>
        <span role="presentation" className="p-ink"></span>
      </button>        
      </div>
            <div className="shadow-2 surface-card border-round p-4">
            <DataTable value={bookings} tableStyle={{ minWidth: '30rem' }} paginator rows={10} >
    <Column field="serviceType" header="Service Type" sortable></Column>
    <Column field="service" header="Service" sortable ></Column>
    <Column field="transport" header="Transport" sortable ></Column>
    <Column field="status" header="Status" sortable body={statusBodyTemplate} ></Column>
    <Column field="date" header="Date/Time" sortable ></Column>
</DataTable>
            </div>
        </div>
        <div className="col-12 lg:col-4 p-2">
        <h3 className="text-bluegray-400 font-semibold">Calendar</h3>
        <div className="shadow-2 surface-card border-round p-4">
        <Calendar value={date} onChange={(e) => setDate(e.value ?? null)} inline />
        <div className="surface-card p-4 shadow-2 border-round mt-4">
    <div className="flex align-items-center justify-content-between">
        <div className="flex flex-column align-items-start">
            <span className="text-xs font-medium text-900">09:15</span>
            <span className="text-m font-medium text-900">Car Pick up</span>
             <span className="text-xs font-medium text-900">Hazmieh Road, Lebanon</span>
        </div>
        <div>
        <Button
      icon="pi pi-ellipsis-v"
      className="p-button-text p-button-plain p-button-rounded"
      onClick={(event) => {
        if (menu1.current) {
          menu1.current.toggle(event);
        }
      }}
    />            
    <Menu ref={menu1} popup model={items}></Menu>
        </div>
    </div>
    
    
</div>

<div className="surface-card p-4 shadow-2 border-round mt-4">
    <div className="flex align-items-center justify-content-between">
        <div className="flex flex-column align-items-start">
            <span className="text-xs font-medium text-900">10:15</span>
            <span className="text-m font-medium text-900">Car Drop off</span>
             <span className="text-xs font-medium text-900">Hazmieh Road, Lebanon</span>
        </div>
        <div>
        <Button
      icon="pi pi-ellipsis-v"
      className="p-button-text p-button-plain p-button-rounded"
      onClick={(event) => {
        if (menu1.current) {
          menu1.current.toggle(event);
        }
      }}
    />            <Menu ref={menu1} popup model={items}></Menu>
    <Slideover
  isVisible={isSlideoverVisible}
  onClose={closeSlideover}
  onSave={() => {/* Save logic */}}
  content={{
    customerName: "Isabel Rio",
    customerId: "300020",
    customerNb: 3185020,
    eventDate: "2023-04-14",
    eventTime: "09:00AM",
    eventType: "Pick Up",
    addressLine1: "Hazmieh Road, Lebanon",
    addressLine2: "2nd Building to the left in Block B",
    status: "Pending",
  }}
/>

<Rescheduler
  isVisible={isReschedulerVisible}
  onClose={() => setIsReschedulerVisible(false)}
/>

        </div>
    </div>
    
    
</div>
            </div>
        </div>
        
    </div>
    
    </MainLayout>
  );
};

export default Dashboard;

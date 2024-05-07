import MainLayout from "@/shared/layout/MainLayout";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef } from "react";


const Notifications = () => {    
    
    
    const items = [
        {
            label: 'Options',
            items: [
                { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
                { label: 'Search', icon: 'pi pi-fw pi-search' }
            ]
        }];

    const menu1 = useRef(null);
    const menu2 = useRef(null);

        return (
            <MainLayout>
                <div className="surface-card shadow-2 border-round p-4">
    <div className="flex align-items-center justify-content-between mb-4">
        <div className="text-900 font-medium text-xl">Notifications</div>
        <div>
            <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded"  />
            <Menu ref={menu1} popup model={items} />
        </div>
    </div >

    <span className="block text-600 font-medium mb-3">TODAY</span>
    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span className="text-900 line-height-3 font-medium">
                Richard Jones<span className="text-700 font-normal"> has scheduled a car service <span className="text-primary font-medium">Self-Drop</span></span>
            </span>
        </li>
        <li className="flex align-items-center py-2">
            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-download text-xl text-orange-500"></i>
            </div>
            <span className="text-700 line-height-3">Your request for reschedule of <span className="text-primary font-medium">Car Drop off</span> has been initiated.</span>
        </li>
    </ul>

    <span className="block text-600 font-medium mb-3">YESTERDAY</span>
    <ul className="p-0 m-0 list-none">
        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span className="text-900 line-height-3 font-medium">
            Keyser Wick <span className="text-700 font-normal"> has scheduled a car service <span className="text-primary font-medium">Self-Drop</span></span>
            </span>
        </li>
        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-question text-xl text-pink-500"></i>
            </div>
            <span className="text-900 line-height-3 font-medium">
                Jane Davis<span className="text-700 font-normal"> has scheduled a car service</span>
            </span>
        </li>
    
    </ul>
</div>
            </MainLayout>
        );
      };
      
      export default Notifications;
      
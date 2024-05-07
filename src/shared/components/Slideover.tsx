import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";

interface SlideoverProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: () => void;
    content: {
        customerName: string;
        customerId: string;
        customerNb: number;
        eventDate: string;
        eventTime: string;
        eventType: string;
        addressLine1: string;
        addressLine2: string;
        status: string;
    };
}

  
const Slideover: React.FC<SlideoverProps> = ({ isVisible, onClose, onSave, content }) => {
    return (
      <div className={isVisible ? "" : "hidden"}>
          <div id="slideover-3" className="surface-overlay absolute top-0 right-0 shadow-2 w-full lg:w-6 h-full">
              <div className="flex flex-column h-full p-4">
                  <div className="flex align-items-center justify-content-between mb-4">
                      <span className="text-900 text-xl font-medium">Details</span>
                      <Button onClick={onClose} icon="pi pi-times" className="p-button-rounded p-button-text p-button-plain" />
                  </div>
                  <div className="flex-auto overflow-y-auto p-3">
                      <ul className="list-none p-0 m-0">
                          <li className="surface-100 text-sm text-700 font-medium p-2 border-round mb-1">Customer</li>
                          <li className="text-900 p-2">{content.customerName}</li>
                          <li className="text-900 p-2">{content.customerNb}</li>
                          <li className="surface-100 text-sm text-700 font-medium p-2 border-round mt-4 mb-1">Event Date & Time</li>
                          <li className="text-900 p-2">{content.eventDate}</li>
                          <li className="text-900 p-2">{content.eventTime}</li>
                          <li className="surface-100 text-sm text-700 font-medium p-2 border-round mt-4 mb-1">Event</li>
                          <li className="text-900 p-2">{content.eventType}</li>
                          <li className="surface-100 text-sm text-700 font-medium p-2 border-round mt-4 mb-1">Address</li>
                          <li className="text-900 p-2">{content.addressLine1}</li>
                          <li className="text-900 p-2">{content.addressLine2}</li>
                          <li className="surface-100 text-sm text-700 font-medium p-2 border-round mt-4 mb-1">Status</li>
                          <li className="text-900 p-2">{content.status}</li>
                      </ul>
                  </div>
                  <div className="flex justify-content-end p-3">
                      <Button label="Save" onClick={onSave} className="p-button-success mr-2" />
                      <Button label="Close" onClick={onClose} className="p-button-secondary" />
                  </div>
              </div>
          </div>
      </div>
    );
  };
  
  
  export default Slideover;
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface ReschedulerProps {
    isVisible: boolean;
    onClose: () => void;
  }


const Rescheduler: React.FC<ReschedulerProps> = ({ isVisible, onClose }) => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
  
    return (

<Dialog
    visible={isVisible}
    onHide={onClose}
    modal
    breakpoints={{ '960px': '75vw', '640px': '100vw' }}
    header={
        <div className="flex flex-column gap-2">
            <h1 className="m-0 text-900 font-semibold text-xl line-height-3">Rescheduler</h1>
            <span className="text-600 text-base font-normal">Choose a day and time in the future you want your event to be rescheduled.</span>
        </div>
    }
    footer={
        <div className="flex gap-3 justify-content-end border-top-1 surface-border pt-5">
            <Button label="Cancel" onClick={() => onClose} className="p-button-text"></Button>
            <Button label="Update" onClick={() => onClose} className="p-button-rounded"></Button>
        </div>
    }
    style={{ width: '52vw' }}
    draggable={false}
    resizable={false}>
    <form className="flex flex-column gap-3 mt-3">
        <div>
        <label htmlFor="date" className="block mb-1 text-color text-base">
                Date
            </label>
        <Calendar value={date} onChange={(e) => setDate(e.value ?? null)} showButtonBar />

        </div>
     
        <div className="flex gap-3">

            <div className="w-full">
                <label htmlFor="expiration" className="block mb-1 text-color text-base">
                    Time
                </label>
                <Calendar value={time} onChange={(e) => setTime(e.value ?? null)}  timeOnly />
            </div>
        </div>
    </form>
</Dialog>

    );
  };
  
  export default Rescheduler;
  

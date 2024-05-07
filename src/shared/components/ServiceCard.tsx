import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

type ServiceCardProps = {
  image: string;
  serviceTitle: string;
  numberOfServices: number;
  viewLink: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ image, serviceTitle, numberOfServices, viewLink }) => {
  const navigate = useNavigate();

  const onViewClick = () => {
    navigate(viewLink);
  };


  return (
    <div className="col-12 md:col-6 xl:col-3 p-3">
      <div className="surface-card shadow-2 border-round p-3">
        <div className="flex flex-column align-items-center border-bottom-1 surface-border pb-3">
          <img src={image} style={{ width: '70px', height: '70px' }} className="mb-3" alt={serviceTitle} />
          <span className="text-xl text-900 font-medium mb-2">{serviceTitle}</span>
          <span className="text-600 surface-200 p-2 border-round">{numberOfServices} Services</span>
        </div>
        <div className="flex pt-3">
          <Button label="View" link className="p-button-outlined p-button-secondary w-full" style={{ borderRadius: "30px" }} onClick={onViewClick} />
          

        </div>
      </div>
    </div>
  );
};

export default ServiceCard;




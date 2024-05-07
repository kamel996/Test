// export interface Booking {
//     id: number;
//     serviceType: string;
//     service: string;
//     transport: string;
//     status: string;
//     date: string;
//   }

import { Customer } from "./customer";

export  type ServiceBookingStatus = 'New' | 'Ongoing' | 'Pending' | 'Cancelled';

export type ServiceType = 'Maintenance Service' | 'Car Repair' | 'Home Service' | 'Car Detaling' | 'Roadside Assistance' ;

export type Transport = 'Drop Off' | 'Self-Drop' | 'Delivery' ;


export interface ServiceBooking {
  id: number;
  carModel: string;
  serviceType: ServiceType;
  service: string;
  transport: Transport;
  status: ServiceBookingStatus;
  customer: string;
  customerId?: number;
  amount: number;
  date: string | Date;
}
  
export const bookings: ServiceBooking[] = [
    { id: 1, carModel: "Tesla Model S", serviceType: "Maintenance Service", service: "Major Service", transport: "Drop Off", status: "New", customer: "John Doe", amount: 299, date: "2023-04-10T10:00" },
    { id: 2, carModel: "Toyota Corolla", serviceType: "Car Repair", service: "Engine Repair", transport: "Self-Drop", status: "Ongoing", customer: "Jane Smith", amount: 350, date: "2023-04-11T11:00" },
    { id: 3, carModel: "Ford Focus", serviceType: "Home Service", service: "Oil Change", transport: "Delivery", status: "Pending", customer: "Alice Johnson", amount: 150, date: "2023-04-12T09:30" },
    { id: 4, carModel: "BMW 3 Series", serviceType: "Car Detaling", service: "Full Detailing", transport: "Drop Off", status: "New", customer: "Bob Brown", amount: 400, date: "2023-04-13T14:00" },
    { id: 5, carModel: "Honda Civic", serviceType: "Maintenance Service", service: "Tire Rotation", transport: "Self-Drop", status: "Ongoing", customer: "Charlie Davis", amount: 75, date: "2023-04-14T15:30" },
    { id: 6, carModel: "Chevrolet Malibu", serviceType: "Roadside Assistance", service: "Battery Jumpstart", transport: "Delivery", status: "Cancelled", customer: "Diane Evans", amount: 100, date: "2023-04-15T10:15" },
    { id: 7, carModel: "Audi A4", serviceType: "Car Repair", service: "Brake Replacement", transport: "Drop Off", status: "Pending", customer: "Evan Foster", amount: 450, date: "2023-04-16T11:45" },
    { id: 8, carModel: "Mercedes-Benz C-Class", serviceType: "Home Service", service: "AC Inspection", transport: "Delivery", status: "Ongoing", customer: "Grace Hopper", amount: 220, date: "2023-04-17T12:30" },
    { id: 9, carModel: "Nissan Sentra", serviceType: "Maintenance Service", service: "Filter Change", transport: "Self-Drop", status: "New", customer: "Henry Irwin", amount: 90, date: "2023-04-18T13:20" },
    { id: 10, carModel: "Subaru Outback", serviceType: "Car Detaling", service: "Interior Cleaning", transport: "Drop Off", status: "Cancelled", customer: "Irene Jensen", amount: 150, date: "2023-04-19T08:50" },
    // Add more bookings as needed...
  ];
  
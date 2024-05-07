export const ServiceListService = {
    getCarPartsData() {
        return [
            {
                id: '303',
                code: 'brake300',
                name: 'Brakes',
            
            },
            {
                id: '302',
                code: 'tire500',
                name: 'Tires',
    
            }
        ];
    },

    getCarPartFamiliesWithServiceData() {
        return [
            {
                id: '303',
                code: 'brake300',
                name: 'Brakes',
                services: [
                    {
                        id: '303203',
                        code: 'brakepad30011',
                        name: 'Brake Rotor Machining',
                        price: 50,
                    },
                    {
                        id: '303202',
                        code: 'brakepad30012',
                        name: 'Brake Fluid Flushing',
                        price: 45,
                        number: 5,
                        availability: 'Low Stock',
                        supplier: 'XYZ Car Parts',
                        supplierNumber: 'XYZ456'
                    }
                ]
            },

            {
                id: '302',
                code: 'tire500',
                name: 'Tires',
                description: 'Car Part Family',
                services: [
                    {
                        id: '302201',
                        code: 'tire50011',
                        name: 'Tire Pressure Check and Adjustment',
                        price: 100,
                        number: 5,
                        availability: 'In Stock',
                        supplier: 'Global Auto Supplies',
                        supplierNumber: 'GAS101'
                    }
                ]
            }
        ];
    },
    
    

getPartsMini() {
    return Promise.resolve(this.getCarPartsData().slice(0, 5));
},

getProductsSmall() {
    return Promise.resolve(this.getCarPartsData().slice(0, 10));
},

getProducts() {
    return Promise.resolve(this.getCarPartsData());
},

getProductsWithOrdersSmall() {
    return Promise.resolve(this.getCarPartFamiliesWithServiceData().slice(0, 10));
},

getProductsWithOrders() {
    return Promise.resolve(this.getCarPartFamiliesWithServiceData());
}
};


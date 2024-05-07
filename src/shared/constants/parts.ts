export const CarPartService = {
        getCarPartsData() {
            return [
                {
                    id: '303',
                    code: 'brake300',
                    name: 'Brakes',
                
                },
                {
                    id: '314',
                    code: 'filter400',
                    name: 'Engine Lubrication System',
    
                },
                {
                    id: '302',
                    code: 'tire500',
                    name: 'Tires',
        
                }
            ];
        },

        getCarPartFamiliesWithPartsData() {
            return [
                {
                    id: '303',
                    code: 'brake300',
                    name: 'Brakes',
                    parts: [
                        {
                            id: '30301',
                            code: 'brakepad30011',
                            name: 'Brake Pad - Front',
                            price: 50,
                            number: 5,
                            availability: 'In Stock',
                            supplier: 'ABC Auto Parts',
                            supplierNumber: 'ABC123'
                        },
                        {
                            id: '30302',
                            code: 'brakepad30012',
                            name: 'Brake Pad - Rear',
                            price: 45,
                            number: 5,
                            availability: 'Low Stock',
                            supplier: 'XYZ Car Parts',
                            supplierNumber: 'XYZ456'
                        }
                    ]
                },
                {
                    id: '314',
                    code: 'filter400',
                    name: 'Filters',
                    description: 'Car Part Family',
                    parts: [
                        {
                            id: '2001-1',
                            code: 'airfilter40011',
                            name: 'Air Filter - Standard',
                            price: 15,
                            number: 5,
                            availability: 'Out of Stock',
                            supplier: 'Car Accessories Inc.',
                            supplierNumber: 'CAI789'
                        }
                    ]
                },
                {
                    id: '302',
                    code: 'tire500',
                    name: 'Tires',
                    description: 'Car Part Family',
                    image: 'tires.jpg',
                    parts: [
                        {
                            id: '2002-1',
                            code: 'tire50011',
                            name: 'Tire - All Season',
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
        return Promise.resolve(this.getCarPartFamiliesWithPartsData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getCarPartFamiliesWithPartsData());
    }
};


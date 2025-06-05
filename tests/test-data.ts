export interface Product {
  name: string;
  variant?: string;
  quantity: number;
}

export const products: Product[] = [
  { name: 'Producto 1', variant: 'Color Rojo', quantity: 1 },
  { name: 'Producto 2', variant: 'Talla M', quantity: 1 },
  { name: 'Producto 3', variant: 'Modelo Especial', quantity: 1 }
];

export const userInfo = {
  firstName: 'Juan',
  lastName: 'Perez',
  email: 'juan.perez@example.com',
  address: 'Calle Falsa 123',
  city: 'Ciudad',
  postalCode: '0000',
  country: 'Chile',
  paymentMethod: 'tarjeta'
};

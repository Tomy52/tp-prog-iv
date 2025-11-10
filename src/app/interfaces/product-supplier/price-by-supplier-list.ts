import {PriceSupplierPage} from './price-supplier-page';

export interface PriceBySupplierList {
  idSupplier: string;
  companyName: string;
  productsList: PriceSupplierPage;
}

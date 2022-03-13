import {Customer} from '../customer/customer';
import {Employee} from '../employee/employee';

export interface ContractDto {
  contractId ?: number;
  contractCode ?: string;
  contractExpired ?: string;
  contractDateStart ?: string;
  contractDateEnd ?: string;
  contractTotal ?: string;
  contractContent ?: string;
  contractDeleteFlag ?: boolean;
  checkFlag ?: number;
  contractImageUrl?: string;
  customerId ?: number;
  employeeId ?: number;
  spacesId ?: number;
  contractDeposit: number;
  contractTaxCode: number;
  price: number;
}

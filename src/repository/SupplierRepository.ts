import { Supplier } from '../entity/Supplier';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Not } from 'typeorm';

@EntityRepository(Supplier)
export class SupplierRepository extends Repository<Supplier> {

  private supplierRepo: Repository<Supplier>

  constructor() {
    super()
    this.supplierRepo = getRepository(Supplier)
  }

  public getAll = async () => {
    
  }

  public findOneById = async (supplierId: string) => {
    try {
      const supplier = await this.supplierRepo.findOneOrFail({
        where: {
          id: supplierId
        },
        relations: ['company']
      })

      return supplier
    } catch (error) {
      throw new Error(error);
    }
  }

  public findByName = async (name: string, companyId: string) => {
    try {
      const suppliers = await this.supplierRepo.find({
        where: {
          name: name,
          company: companyId
        },
        relations: ['company']
      })

      return suppliers
    } catch (error) {
      throw new Error(error);
    }
  }

  public checkIfExist = async (name: string, companyId: string) => {
    try {
      const suppliers = await this.supplierRepo.find({
        where: {
          name: name,
          company: companyId
        }
      })

      return suppliers
    } catch (error) {
      throw new Error(error);
    }
  }
}
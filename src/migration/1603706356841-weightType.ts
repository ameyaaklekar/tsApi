import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { WeightType } from "../entity/WeightType";

export class weightType1603706356841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let units = [
            {
              name: 'Weight (1 Kilo)'
            }, 
            {
              name: 'Volume (1 Liter)'
            }, 
            {
              name: 'Count (1 Unit)'
            }
        ]

        for (let i = 0; i < units.length; i++) {
            let repo = getRepository(WeightType);
            let entity = new WeightType();
            entity.name = units[i].name;
            await repo.save(entity);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

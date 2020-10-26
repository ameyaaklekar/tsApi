import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { GeneralUnit } from "../entity/GeneralUnit";

export class generalUnits1603705933884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let units = [
            {
              unit: 'kgs',
              description: 'kgs - Kilo Gram',
            }, 
            {
              unit: 'gms',
              description: 'gms - Grams',
            }, 
            {
              unit: 'mgs',
              description: 'mgs - Milli Grams',
            }, 
            {
              unit: 'l',
              description: 'l - Liter',
            }, 
            {
              unit: 'ml',
              description: 'ml - Milli Liter',
            }, 
            {
              unit: 'piece',
              description: 'count - Piece',
            }, 
        ];

        for (let i = 0; i < units.length; i++) {
            let unitsRepo = getRepository(GeneralUnit);
            let generalUnit = new GeneralUnit();
            generalUnit.unit = units[i].unit;
            generalUnit.description = units[i].description;
            await unitsRepo.save(generalUnit);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

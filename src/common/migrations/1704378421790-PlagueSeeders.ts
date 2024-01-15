import Guid from "@application/entity/Guid";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import plagueSchema from "@modules/plague/infrastructure/schema/PlagueSchema";
import { MigrationInterface, QueryRunner } from "typeorm"

export class PlagueSeeders1704378421790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const plagueRepository = queryRunner.manager.getRepository(plagueSchema);

        plagueRepository.insert({ id: new Guid().toString(), name: PlagueEnum.Cerscospora, createdAt: new Date() })
        plagueRepository.insert({ id: new Guid().toString(), name: PlagueEnum.LeafRust, createdAt: new Date() })
        plagueRepository.insert({ id: new Guid().toString(), name: PlagueEnum.Phoma, createdAt: new Date() })
        plagueRepository.insert({ id: new Guid().toString(), name: PlagueEnum.Miner, createdAt: new Date() })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.delete(plagueSchema, { name: PlagueEnum.Cerscospora })
        queryRunner.manager.delete(plagueSchema, { name: PlagueEnum.LeafRust })
        queryRunner.manager.delete(plagueSchema, { name: PlagueEnum.Phoma })
        queryRunner.manager.delete(plagueSchema, { name: PlagueEnum.Miner })
    }

}

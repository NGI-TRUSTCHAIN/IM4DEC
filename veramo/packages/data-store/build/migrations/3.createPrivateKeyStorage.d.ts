import { MigrationInterface, QueryRunner } from 'typeorm';
/**
 * Migration of existing private keys from Veramo 2.x to Veramo 3.x
 *
 * @public
 */
export declare class CreatePrivateKeyStorage1629293428674 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
//# sourceMappingURL=3.createPrivateKeyStorage.d.ts.map
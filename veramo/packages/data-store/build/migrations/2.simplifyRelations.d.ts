import { MigrationInterface, QueryRunner } from 'typeorm';
/**
 * Fix inconsistencies between Entity data and column data.
 *
 * @public
 */
export declare class SimplifyRelations1447159020002 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
//# sourceMappingURL=2.simplifyRelations.d.ts.map
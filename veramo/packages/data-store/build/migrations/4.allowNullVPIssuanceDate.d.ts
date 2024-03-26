import { MigrationInterface, QueryRunner } from 'typeorm';
/**
 * Reduce issuanceDate constraint of Presentations.
 *
 * @public
 */
export declare class AllowNullIssuanceDateForPresentations1637237492913 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
//# sourceMappingURL=4.allowNullVPIssuanceDate.d.ts.map
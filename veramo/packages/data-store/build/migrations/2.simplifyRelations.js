import { TableColumn } from 'typeorm';
import { migrationGetExistingTableByName } from './migration-functions.js';
/**
 * Fix inconsistencies between Entity data and column data.
 *
 * @public
 */
export class SimplifyRelations1447159020002 {
    name = 'SimplifyRelations1447159020002'; // Used in case this class gets minified, which would change the classname
    async up(queryRunner) {
        await queryRunner.changeColumn(migrationGetExistingTableByName(queryRunner, 'PreMigrationKey', true), 'identifierDid', new TableColumn({ name: 'identifierDid', type: 'varchar', isNullable: true }));
        await queryRunner.changeColumn(migrationGetExistingTableByName(queryRunner, 'service'), 'identifierDid', new TableColumn({ name: 'identifierDid', type: 'varchar', isNullable: true }));
    }
    async down(queryRunner) {
        throw new Error('illegal_operation: cannot roll back initial migration');
    }
}
//# sourceMappingURL=2.simplifyRelations.js.map
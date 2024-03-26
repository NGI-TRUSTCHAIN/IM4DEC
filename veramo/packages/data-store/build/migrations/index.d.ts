import { MigrationInterface } from 'typeorm';
import { CreateDatabase1447159020001 } from './1.createDatabase.js';
/**
 * Allow others to use shared migration functions if they extend Veramo
 *
 * @public
 */
export * from './migration-functions.js';
/**
 * The migrations array that SHOULD be used when initializing a TypeORM database connection.
 *
 * These ensure the correct creation of tables and the proper migrations of data when tables change between versions.
 *
 * @public
 */
export declare const migrations: (typeof CreateDatabase1447159020001)[];
/**
 * The migrations helper that allows migrations from multiple sources to be combined into a single array.
 *
 * @public
 */
export declare function migrationConcat(...migrationArrays: MigrationInterface[][]): MigrationInterface[];
//# sourceMappingURL=index.d.ts.map
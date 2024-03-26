import { QueryRunner, Table } from 'typeorm';
/**
 * Get an existing table by name. Checks against givenTableName first, and tableName next. Throws an error if not found
 *
 * @param queryRunner The query runner object to use for querying
 * @param givenName The given name of the table to search for
 * @param strictClassName Whether the table name should strictly match the given name
 *
 * @public
 */
export declare function migrationGetExistingTableByName(queryRunner: QueryRunner, givenName: string, strictClassName?: boolean): Table;
/**
 * Get a table name. Checks against givenTableName first, and tableName next from existing tables. Then returns the name. If not found returns the givenName argument
 *
 * @param queryRunner The query runner object to use for querying
 * @param givenName The given name of the table to search for
 * @param strictClassName Whether the table name should strictly match the given name
 * @public
 */
export declare function migrationGetTableName(queryRunner: QueryRunner, givenName: string, strictClassName?: boolean): string;
//# sourceMappingURL=migration-functions.d.ts.map
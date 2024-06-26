import { DataSource } from 'typeorm';
import { OrPromise } from "@veramo/utils";
/**
 *  Ensures that the provided DataSource is connected.
 *
 * @param dbConnection - a TypeORM DataSource or a Promise that resolves to a DataSource
 */
export declare function getConnectedDb(dbConnection: OrPromise<DataSource>): Promise<DataSource>;
//# sourceMappingURL=utils.d.ts.map
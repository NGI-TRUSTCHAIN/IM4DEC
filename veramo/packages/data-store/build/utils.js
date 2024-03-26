/**
 *  Ensures that the provided DataSource is connected.
 *
 * @param dbConnection - a TypeORM DataSource or a Promise that resolves to a DataSource
 */
export async function getConnectedDb(dbConnection) {
    if (dbConnection instanceof Promise) {
        return await dbConnection;
    }
    else if (!dbConnection.isInitialized) {
        return await dbConnection.initialize();
    }
    else {
        return dbConnection;
    }
}
//# sourceMappingURL=utils.js.map
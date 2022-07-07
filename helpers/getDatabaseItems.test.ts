import { databaseQuery } from "../__mocks__/@notionhq/client";
import { PROJECTS_DATABASE_ID } from "./Constants";
import getDatabaseItems from "./getDatabaseItems";

describe('getProjectDatabaseBlocks', () => {
  it('Returns an array of DatabaseItem\'s', async () => {
    const items = await getDatabaseItems(PROJECTS_DATABASE_ID);
    expect(databaseQuery).toHaveBeenCalled();
    expect(items.length).toBeGreaterThan(0);
  });
});
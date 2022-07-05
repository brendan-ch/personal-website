import { databaseQuery } from "../../__mocks__/@notionhq/client";
import { PROJECTS_DATABASE_ID } from "../Constants";
import getProjectDatabaseBlocks from "./getProjectDatabaseBlocks";

describe('getProjectDatabaseBlocks', () => {
  it('Returns an array of DatabaseItem\'s', async () => {
    const items = await getProjectDatabaseBlocks(PROJECTS_DATABASE_ID);
    expect(databaseQuery).toHaveBeenCalled();
    expect(items.length).toBeGreaterThan(0);
  });
});
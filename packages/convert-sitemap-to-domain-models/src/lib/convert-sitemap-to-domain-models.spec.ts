import {
  convertSitemapToDomainModels,
  convertURIListToCollectionsNamesList,
} from './convert-sitemap-to-domain-models';

describe('convertURIListToCollectionsNamesList', () => {
  it('extracts paths that have multiple nodes as collections and others as pages', () => {
    expect(
      convertURIListToCollectionsNamesList([
        'https://example.com/foo/1',
        'https://example.com/foo/2',
        'https://example.com/bar/',
      ])
    ).toEqual({
      collections: ['foo'],
      pages: ['/bar'],
    });
  });
});

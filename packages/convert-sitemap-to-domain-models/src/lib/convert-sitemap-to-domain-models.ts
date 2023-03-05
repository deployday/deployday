import GetSitemapLinks from 'get-sitemap-links';

export const convertSitemapToDomainModels = async (sitemap: string) => {
  const array = await GetSitemapLinks(sitemap);
  return convertURIListToCollectionsNamesList(array);
};

export const convertURIListToCollectionsNamesList = (list: string[]) => {
  const models = list.reduce<{
    collectionInstancesMap: { [key: string]: number };
    collectionsNames: string[];
    pagesURIs: string[];
  }>(
    (prev, curr) => {
      const parts = curr.split('/');
      const category = parts[3];
      const page = `/${category}`;
      if (!prev.collectionInstancesMap?.[category]) {
        prev.collectionInstancesMap[category] = 1;
        if (page) prev.pagesURIs.push(page);
      } else {
        if (prev.collectionsNames.indexOf(category) === -1)
          prev.collectionsNames.push(category);
        const pageIndex = prev.pagesURIs.indexOf(page);
        prev.pagesURIs.splice(pageIndex, 1);
      }
      return prev;
    },
    {
      collectionInstancesMap: {},
      collectionsNames: [],
      pagesURIs: [],
    }
  );
  return {
    collections: models.collectionsNames,
    pages: models.pagesURIs,
  };
};

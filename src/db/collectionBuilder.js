const filter = (predicateObj) => (list) => {
  const predicates = Object.keys(predicateObj).reduce(
    (fns, key) => [...fns, (item) => item[key] === predicateObj[key]],
    []
  );
  // console.log(list);
  const predicatesRunner = (predicates) => (obj) =>
    predicates.reduce((acc, predicate) => acc && predicate(obj), true);

  // console.log(list);
  const filterRes = list.reduce((resAcc, item) => {
    return (predicatesRunner(predicates)(item) && [...resAcc, item]) || resAcc;
  }, []);
  return filterRes;
};

const exist = (collection) => (id) =>
  collection.reduce((acc, item) => (acc && acc) || item.id === id, false);

const collectionBuilder = (initialValue) => {
  let collection = initialValue;
  const handlers = {
    create: (newItem) => {
      const recordExist = exist(collection)(newItem.id);
      console.log(recordExist);
      if (!recordExist) {
        collection = [...collection, newItem];
        return { createdAt: new Date().getTime(), created: newItem };
      }
      throw new Error('this record exists already.');
    },
    find: (predicateObj) => filter(predicateObj)(collection),
    update: (predicateObj, fragment) => {
      const match = filter(predicateObj)(collection);
      const updates = match.reduce((acc, matched) => {
        const matchedIndex = collection.findIndex((item) => item.id === matched.id);
        if (matchedIndex > -1) {
          const updatedItem = { ...collection[matchedIndex], ...fragment };
          collection = [
            ...collection.slice(0, matchedIndex),
            updatedItem,
            ...collection.slice(matchedIndex + 1),
          ];
          return [...acc, updatedItem];
        }
        return acc;
      }, []);
      return updates;
    },
    remove: (ids) => {
      ((ids) => (Array.isArray(ids) ? ids : [ids]))(ids).forEach((id) => {
        const matchedIndex = collection.findIndex((item) => item.id === id);
        if (matchedIndex > -1) {
          collection = [
            ...collection.slice(0, matchedIndex),
            ...collection.slice(matchedIndex + 1),
          ];
        }
      });
    },
    count: () => {
      return collection.length;
    },
  };
  return handlers;
};

export default collectionBuilder;

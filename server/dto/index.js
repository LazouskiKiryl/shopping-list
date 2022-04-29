const listToDto = (list) => {
  return {
    id: list._id,
    title: list.title,
  };
};

const purchaseToDto = (purchase) => {
  return {
    id: purchase._id,
    title: purchase.title,
    count: purchase.count,
    listId: purchase.list,
    date: purchase.date,
    done: purchase.done,
  };
};

module.exports = {
  listToDto,
  purchaseToDto,
};

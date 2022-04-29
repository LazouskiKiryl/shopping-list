import { $authHost } from './hosts';

class DataService {
  static fetchData() {
    return $authHost.get('/data/');
  }

  static createPurchase(title, count, listId) {
    return $authHost.post('/data/purchase', { title, count, listId });
  }

  static updatePurchase(purchase) {
    const { id, title, count, done } = purchase;
    return $authHost.put(`/data/purchase/${id}`, { title, count, done });
  }

  static deletePurchase(id) {
    return $authHost.delete(`/data/purchase/${id}`);
  }

  static createList(title) {
    return $authHost.post('/data/list/', { title });
  }

  static updateList(id, title) {
    return $authHost.put(`/data/list/${id}`, { title });
  }

  static deleteList(id) {
    return $authHost.delete(`/data/list/${id}`);
  }
}

export default DataService;

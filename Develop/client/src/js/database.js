import { openDB } from 'idb';

function initdb() {
  return openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
}

export function putDb(content) {
  console.log('PUT to the database');
  return openDB('jate', 1).then((jateDb) => {
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    return request.then((result) => {
      console.log('🚀 - data saved to the database', result);
    });
  });
}

export function getDb() {
  console.log('GET from the database');
  return openDB('jate', 1).then((jateDb) => {
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    return request.then((result) => {
      console.log('result.value', result);
      return result?.value;
    });
  });
}

initdb();

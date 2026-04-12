export function clearStorage() {
  localStorage.clear();
}

export function getItemFromStorage(key) {
  if (!localStorage) return;

  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(`Error getting item ${key} from localStorage`, err);
  }
}

export function storeItem(key, item) {
  if (!localStorage) return;

  try {
    return localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.error(`Error storing item ${item} to localStorage`, err);
  }
}

export function removeItemFromStorage(key) {
  if (!localStorage) return;

  try {
    return localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing item ${key} from localStorage`, err);
  }
}

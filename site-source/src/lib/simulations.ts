export type StockItem = { id: string; name: string; price: number; quantity: number };
export const initialStock: StockItem[] = [
  { id: 'coffee', name: 'Flat white', price: 4.5, quantity: 5 },
  { id: 'matcha', name: 'Iced matcha', price: 5, quantity: 3 },
  { id: 'croissant', name: 'Butter croissant', price: 3.75, quantity: 2 },
];
export function placeOrder(stock: StockItem[], id: string) {
  const item = stock.find(x => x.id === id);
  if (!item || item.quantity < 1) return { stock, accepted: false, message: `${item?.name ?? 'Item'} is unavailable. Please choose another item.` };
  return { stock: stock.map(x => x.id === id ? { ...x, quantity: x.quantity - 1 } : x), accepted: true, message: `Order accepted · ${item.name}. ${item.quantity - 1} remaining.` };
}

// A static three-level B+ style index with fanout 4 and leaves of 4 records.
// It models page visits and ordered key comparisons, not database wall time.
export type IndexNode = { label: string; min: number; max: number; keys: number[]; children: IndexNode[] };
export function buildIndex(size: number): IndexNode {
  const nodes: IndexNode[] = [];
  for (let n = 1; n <= size; n += 4) {
    const keys = Array.from({ length: Math.min(4, size - n + 1) }, (_, i) => n + i);
    nodes.push({ label: `${n}–${keys.at(-1)}`, min: n, max: keys.at(-1)!, keys, children: [] });
  }
  let level = nodes;
  while (level.length > 1) {
    const next: IndexNode[] = [];
    for (let i = 0; i < level.length; i += 4) {
      const children = level.slice(i, i + 4);
      next.push({ label: `${children[0].min}–${children.at(-1)!.max}`, min: children[0].min, max: children.at(-1)!.max, keys: children.slice(1).map(n => n.min), children });
    }
    level = next;
  }
  return level[0];
}
export function indexLookup(root: IndexNode, target: number) {
  const steps: { label: string; keys: number[]; comparisons: number; leaf: boolean }[] = [];
  let node = root;
  let comparisons = 0;
  while (true) {
    if (!node.children.length) {
      for (const key of node.keys) { comparisons++; if (key >= target) break; }
      steps.push({ label: node.label, keys: node.keys, comparisons, leaf: true });
      return { steps, comparisons, found: node.keys.includes(target) };
    }
    let child = 0;
    for (const key of node.keys) { comparisons++; if (target < key) break; child++; }
    steps.push({ label: node.label, keys: node.keys, comparisons, leaf: false });
    node = node.children[child];
  }
}

export function simulateLogin(raw: string) {
  let body: Record<string, unknown>;
  try { body = JSON.parse(raw); } catch { return { status: 400, error: true, response: { error: 'Invalid JSON. Check commas and quotation marks.' } }; }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { status: 400, error: true, response: { error: 'Request body must be a JSON object.' } };
  if (!body.username && !body.email) return { status: 400, error: true, response: { error: 'Username or email is required' } };
  if (body.username !== 'demo-user' && body.email !== 'demo@example.com') return { status: 404, error: true, response: { error: 'User does not exist' } };
  if (body.password !== 'demo-password') return { status: 401, error: true, response: { error: 'Invalid user credentials' } };
  return { status: 200, error: false, response: { data: { user: { _id: 'demo-user-id', username: 'demo-user', email: 'demo@example.com', fullName: 'Demo User', avatar: '[sample avatar URL]', coverImage: '' }, accessToken: '[simulated-access-token]', refreshToken: '[simulated-refresh-token]' }, message: 'User logged in Successfully ', success: true } };
}

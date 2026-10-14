import test from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import { buildIndex, indexLookup, initialStock, placeOrder, simulateLogin } from '../src/lib/simulations';
import { PUZZLE_FEN } from '../src/components/chess-puzzle';

test('orders decrement only the selected item and never oversell', () => {
  let stock = initialStock.map(i => ({ ...i }));
  for (let i = 0; i < 5; i++) { const r = placeOrder(stock, 'coffee'); assert.equal(r.accepted, true); stock = r.stock; }
  const r = placeOrder(stock, 'coffee');
  assert.equal(r.accepted, false); assert.equal(r.stock.find(i => i.id === 'coffee')!.quantity, 0);
  assert.equal(r.stock.find(i => i.id === 'matcha')!.quantity, 3);
  assert.equal(initialStock[0].quantity, 5, 'initial state is immutable');
  assert.equal(placeOrder(stock, 'missing').accepted, false);
});
test('taking stock offline rejects an order and restocking restores ordering', () => {
  const stock = initialStock.map(i => ({ ...i, quantity: 0 }));
  assert.equal(placeOrder(stock, 'croissant').accepted, false);
  stock[2].quantity = 1;
  assert.equal(placeOrder(stock, 'croissant').accepted, true);
  assert.equal(placeOrder(stock, 'croissant').stock[2].quantity, 0);
});
test('index reaches every key and counts each ordered comparison across all datasets', () => {
  for (const size of [16, 32, 64, 128]) {
    const root = buildIndex(size);
    for (let key = 1; key <= size; key++) {
      const { steps, found, comparisons } = indexLookup(root, key);
      assert.equal(found, true); assert.ok(steps.at(-1)!.keys.includes(key));
      assert.ok(comparisons >= steps.length && comparisons <= steps.length * 4);
      assert.ok(steps.length <= 4);
      let expected = 0;
      steps.forEach(s => { for (const k of s.keys) { expected++; if (s.leaf ? k >= key : key < k) break; } });
      assert.equal(comparisons, expected);
    }
    assert.equal(indexLookup(root, size + 1).found, false);
    assert.equal(indexLookup(root, 0).found, false);
  }
});
test('sample login provides deterministic source-shaped success and explicit errors', () => {
  assert.equal(simulateLogin('{').status, 400);
  assert.equal(simulateLogin('null').status, 400);
  assert.equal(simulateLogin('[]').status, 400);
  assert.equal(simulateLogin('{}').status, 400);
  assert.equal(simulateLogin('{"username":"unknown"}').status, 404);
  assert.equal(simulateLogin('{"username":"demo-user","password":"wrong"}').status, 401);
  const result = simulateLogin('{"username":"demo-user","password":"demo-password"}');
  assert.equal(result.status, 200); assert.equal(result.error, false);
  assert.equal('statusCode' in result.response, false);
  assert.equal(simulateLogin('{"email":"demo@example.com","password":"demo-password"}').status, 200);
});
test('chess puzzle is legal, rejects illegal movement, and has the intended mate', () => {
  const chess = new Chess(PUZZLE_FEN);
  assert.equal(chess.isCheck(), false);
  assert.throws(() => chess.move({ from: 'g6', to: 'e5' }));
  assert.equal(chess.move({ from: 'g6', to: 'g7' }).san, 'Qg7#');
  assert.equal(chess.isCheckmate(), true);
});

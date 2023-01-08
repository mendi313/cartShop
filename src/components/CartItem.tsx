import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import sotreItems from '../data/items.json';
import { formatCurrency } from '../utils/formatCurrency';

type CartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = sotreItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className="me-auto">
        <div>
          {item.name}{' '}
          {quantity > 1 ? (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          ) : null}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(quantity * item.price)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

import Badge from '@ui/badge';
import { type OrderT } from '.';

function OrderStatus({ order }: { order: OrderT }) {
  const { id, priority, status } = order;

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
      <h3>Order status (#{id})</h3>
      <div className="space-x-3 font-medium">
        {priority && <Badge variant="destructive">Priority</Badge>}
        <Badge variant={status === 'delivered' ? 'secondary' : 'primary'}>
          order {status}
        </Badge>
      </div>
    </div>
  );
}

export default OrderStatus;

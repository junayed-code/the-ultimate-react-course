import { useLoaderData } from 'react-router-dom';
import { getMenu } from '@services/api/restaurant';
import MenuItem, { type Pizza } from '@features/menu/menu-item';

function Menu() {
  const menu = useLoaderData() as Pizza[];
  return (
    <ul className="grid gap-x-8 gap-y-5 lg:grid-cols-2">
      {menu.map(pizza => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

Menu.loader = async function loader() {
  const menu = await getMenu();
  return menu;
};

export default Menu;

export interface MenuItemNode {
  id: string;
  parentId?: string;
  label: string;
  uri: string;
  [key: string]: any;
}

export interface MenuItem {
  node: MenuItemNode;
  children?: MenuItem[];
}

export interface Menu {
  menu: {
    menuItems: {
      edges: MenuItem[];
    };
  };
}

export function buildMenuStructure(menu: Menu): MenuItem[] {
  const menuItems = menu.menu.menuItems.edges;
  const menuTree: MenuItem[] = [];

  const itemMap: { [id: string]: MenuItem & { children: MenuItem[] } } = {};

  menuItems.forEach(menuItem => {
    const itemWithChildren: MenuItem & { children: MenuItem[] } = {
      ...menuItem,
      children: []
    };
    itemMap[menuItem.node.id] = itemWithChildren;

    if (!menuItem.node.parentId) {
      menuTree.push(itemWithChildren);
    }
  });

  menuItems.forEach(menuItem => {
    const parentId = menuItem.node.parentId;
    if (parentId && itemMap[parentId]) {
      itemMap[parentId].children.push(itemMap[menuItem.node.id]);
    }
  });

  return menuTree;
}

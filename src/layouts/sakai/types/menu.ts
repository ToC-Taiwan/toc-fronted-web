export interface MenuItem {
  label?: string;
  icon?: string;
  to?: string;
  class?: string;
  url?: string;
  target?: string;
  separator?: boolean;
  visible?: boolean;
  items?: MenuItem[];
  disabled?: boolean;
}

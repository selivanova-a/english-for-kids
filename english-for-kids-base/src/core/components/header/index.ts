import Component from '../../templates/components';
import Menu from './menu';

const MENU_SECTIONS = 3;

enum MainRouteLinks {
  MainPage = '#main-page',
  Categories = '#category-page',
}

class Header extends Component {
  private readonly menu: Menu;

  constructor(tagName:string, className:string) {
    super(tagName, className);
    this.menu = new Menu();
  }

  renderHeaderPanel(): void {
    const switchButton = document.createElement('label');
    const checkBox = document.createElement('input');
    const round = document.createElement('div');

    switchButton.className = 'switch';
    checkBox.type = 'checkbox';
    checkBox.id = 'togBtn';
    round.className = 'slider round';

    switchButton.append(checkBox, round);
    this.container.append(switchButton);
  }

  renderBurgerMenu(): void {
    const menuWrapper = document.createElement('a');
    menuWrapper.className = 'burger-menu';
    menuWrapper.href = MainRouteLinks.MainPage;
    if (menuWrapper) {
      for (let i = 0; i < MENU_SECTIONS; i += 1) {
        const line = document.createElement('div');
        line.className = 'burger-menu__item';
        menuWrapper.append(line);
      }
    }
    this.container.append(menuWrapper);
    menuWrapper.addEventListener('click', () => {
      this.menu.openPopup();
    });
  }

  render(): HTMLElement {
    this.renderBurgerMenu();
    this.renderHeaderPanel();
    return this.container;
  }
}

export default Header;

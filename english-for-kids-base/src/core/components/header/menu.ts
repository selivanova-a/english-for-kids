import Component from '../../templates/components';
import cards from '../../../../public/cards';
import CategoryPage from '../../../pages/category';

const LINKS = cards[0];

enum MainRouteLinks {
  MainPage = '#main-page',
  Categories = '#category-page',
}

class Menu extends Component {
  constructor() {
    super('div', 'popup');
  }

  static TextObject = {
    MainLink: 'Main',
  };

  renderPageButtons(): void {
    const pageButtons = document.createElement('div');
    pageButtons.className = 'popup-content';
    const mainLink = document.createElement('a');
    mainLink.innerText = Menu.TextObject.MainLink;
    mainLink.href = MainRouteLinks.MainPage;
    mainLink.className = 'menu-link';
    for (let i = 0; i < LINKS.length; i += 1) {
      const link = document.createElement('a');
      link.innerText = LINKS[i].toString();
      link.href = MainRouteLinks.Categories;
      link.className = 'menu-link';
      pageButtons.append(link);
      link.addEventListener('click', () => {
        CategoryPage.switchPageIndex = i;
        this.clearLinkDecoration();
        link.classList.add('active-link');
      });
    }
    pageButtons.append(mainLink);
    this.container.append(pageButtons);
  }

  clearLinkDecoration(): void {
    const links = document.querySelectorAll('.menu-link');

    if (links) {
      links.forEach((link) => link.classList.remove('active-link'));
    }
    this.container.classList.add('show');
  }

  openPopup(): void {
    const popup = document.querySelector('.popup');

    if (popup) {
      popup.classList.add('active');
    }
    this.container.classList.add('show');
  }

  closePopup(): void {
    const closeButton = document.createElement('div');
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-times';
    closeButton.className = 'close-button';
    closeButton.append(closeIcon);
    this.container.append(closeButton);

    closeButton.addEventListener('click', () => {
      this.container.classList.remove('active');
    });
    this.container.addEventListener('click', () => {
      this.container.classList.remove('active');
    });
  }

  render(): HTMLElement {
    this.closePopup();
    this.renderPageButtons();
    return this.container;
  }
}

export default Menu;

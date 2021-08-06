import Page from '../../core/templates/page';
import MainPage from '../main';
import CategoryPage from '../category';
import ErrorPage from '../error';
import Header from '../../core/components/header';
import Menu from '../../core/components/header/menu';

export const enum PageIds {
  MainPageLink = 'main-page',
  CategoryPageLink = 'category-page',
}

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  private initialPage: MainPage;

  private header: Header;

  private menu : Menu;

  static renderNewPage(idPage: string): void {
    const currentPageHTML = document.getElementById(App.defaultPageId);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPageLink) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.CategoryPageLink) {
      page = new CategoryPage(idPage);
    } else {
      page = new ErrorPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
      this.menu.closePopup();
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header-container');
    this.menu = new Menu();
  }

  run(): void {
    App.container.append(this.header.render());
    App.container.append(this.menu.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default App;

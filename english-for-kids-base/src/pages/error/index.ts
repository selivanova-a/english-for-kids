import Page from '../../core/templates/page';

class ErrorPage extends Page {
  constructor(id: string) {
    super(id);
    this.container.classList.remove('error');
  }

  static TextObject = {
    ErrorText: 'Oops! The Page not found: 404',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(ErrorPage.TextObject.ErrorText);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;

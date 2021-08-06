abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string): HTMLElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    this.container.append();
    return headerTitle;
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Page;

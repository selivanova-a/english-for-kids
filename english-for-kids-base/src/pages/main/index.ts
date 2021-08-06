import Page from '../../core/templates/page';
import cards from '../../../public/cards';
import CategoryPage from '../category';
import Footer from '../../core/components/footer';

export const NAMES = cards[0];
export const IMAGES = cards[1];

enum MainRouteLinks {
  MainPage = '#main-page',
  Categories = '#category-page',
}

class MainPage extends Page {
  private footer: Footer;

  static TextObject = {
    MainTitle: 'Train & Play',
  };

  constructor(id: string) {
    super(id);
    this.footer = new Footer();
  }

  isChange = false;

  renderMenuCards(): void {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards';
    for (let i = 0; i < NAMES.length; i += 1) {
      const card = document.createElement('a');
      const cardImg = document.createElement('div');
      const cardName = document.createElement('div');
      const cardLamp = document.createElement('div');
      card.href = MainRouteLinks.Categories;
      card.className = 'card';
      cardImg.className = 'card__image';
      cardName.className = 'card__name';
      cardLamp.className = 'card__lamp';
      cardImg.style.backgroundImage = `url(/${IMAGES[i]})`;
      cardName.textContent = NAMES[i].toString();
      card.append(cardImg, cardName);
      cardName.append(cardLamp);
      cardsWrapper.append(card);
      card.addEventListener('click', () => {
        CategoryPage.switchPageIndex = i;
      });
    }
    this.container.append(cardsWrapper);
  }

  changeMode(): void {
    const checkbox: HTMLInputElement | null = document.querySelector('#togBtn');

    if (checkbox) {
      checkbox.addEventListener('change', () => {
        this.isChange = checkbox.checked;
        this.changeCardState(this.isChange);
      });
    }
  }

  changeCardState(state: boolean): void {
    const cardLamp = document.querySelectorAll('.card__lamp');
    if (cardLamp) {
      cardLamp.forEach((elem) => {
        if (state) {
          elem.classList.add('play');
        } else {
          elem.classList.remove('play');
          this.container.classList.remove('show');
        }
      });
    }
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    this.renderMenuCards();
    this.changeMode();
    this.container.append(this.footer.render());
    return this.container;
  }
}

export default MainPage;

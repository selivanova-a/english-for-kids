import Page from '../../core/templates/page';
import cards from '../../../public/cards';
import data from '../../../public/data';
import Train from './train';
import Play from './play';

export const NAMES = cards[0];
export const IMAGES = data;
export const DESCRIPTION = data;

class CategoryPage extends Page {
  private readonly train: Train;

  private readonly play: Play;

  static switchPageIndex = 0;

  static TextObject = {
    MainTitle: 'Category Page',
  };

  constructor(id: string) {
    super(id);
    this.train = new Train();
    this.play = new Play();
  }

  selectCardState(): void {
    const checkbox: HTMLInputElement | null = document.querySelector('#togBtn');

    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox && checkbox.checked) {
          this.container.innerHTML = '';
          this.turnPlayMode();
        } else if (checkbox && !checkbox.checked) {
          this.container.innerHTML = '';
          this.turnTrainMode();
        }
      });
    }
  }

  switchCardState(): void {
    const checkbox: HTMLInputElement | null = document.querySelector('#togBtn');
    if (checkbox && checkbox.checked) {
      this.turnPlayMode();
    } else if (checkbox && !checkbox.checked) {
      this.turnTrainMode();
    }
  }

  turnTrainMode(): void {
    this.container.append(this.train.render());
  }

  turnPlayMode(): void {
    this.container.append(this.play.render());
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(NAMES[CategoryPage.switchPageIndex].toString());
    this.container.append(title);
    this.selectCardState();
    this.switchCardState();
    return this.container;
  }
}

export default CategoryPage;

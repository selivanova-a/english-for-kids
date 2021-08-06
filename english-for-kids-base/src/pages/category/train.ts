import Component from '../../core/templates/components';
import CategoryPage, { DESCRIPTION, IMAGES } from './index';

class Train extends Component {
  constructor() {
    super('div', 'cards-field');
  }

  renderTrainMode(parent: HTMLElement): void {
    const index = CategoryPage.switchPageIndex;
    const wrapper = parent;
    wrapper.innerHTML = '';

    for (let i = 0; i < IMAGES[index].length; i += 1) {
      const cardContainer: HTMLElement | null = document.createElement('div');
      cardContainer.className = 'card-container';
      const cardTrain = document.createElement('div');
      cardTrain.className = 'card-train';
      const cardWord = document.createElement('div');
      cardWord.className = 'card-train__front';
      const cardWordImg = document.createElement('div');
      const cardWordDescription = document.createElement('div');
      cardWordImg.className = 'card-train__image';
      cardWordDescription.className = 'card-train__text';
      cardWordImg.style.backgroundImage = `url(/${IMAGES[index][i].image})`;

      const cardTranslate = document.createElement('div');
      cardTranslate.className = 'card-train__back';
      const cardTranslateImg = document.createElement('div');
      const cardTranslateDescription = document.createElement('div');
      cardTranslateImg.className = 'card-train__image';
      cardTranslateDescription.className = 'card-train__text';
      const cardTrainTitle = document.createElement('div');
      cardTrainTitle.className = 'card-train__title';
      cardTrainTitle.textContent = DESCRIPTION[index][i].translation;

      cardTranslate.style.backgroundImage = `url(/${IMAGES[index][i].image})`;

      cardTranslateDescription.append(cardTrainTitle);
      cardTranslate.append(cardTranslateImg, cardTranslateDescription);
      cardWord.append(cardWordImg, cardWordDescription);
      cardTrain.append(cardWord, cardTranslate);
      cardContainer.append(cardTrain);
      parent.append(cardContainer);
      this.renderCardTrainDesciption(cardWordDescription, index, i, cardContainer);
      this.playSound(cardTrain, index, i);
      this.flipCardBack(cardTranslateImg, cardContainer);
    }
  }

  renderCardTrainDesciption(parent: HTMLElement, index: number, i: number, card: HTMLElement)
    : void {
    const cardTrainTitle = document.createElement('div');
    cardTrainTitle.className = 'card-train__title';
    cardTrainTitle.textContent = DESCRIPTION[index][i].word;
    const cardFlipButton = document.createElement('div');
    const flipIcon = document.createElement('i');
    flipIcon.className = 'fas fa-sync';
    cardFlipButton.className = 'flip-button';
    cardFlipButton.append(flipIcon);
    parent.append(cardTrainTitle, cardFlipButton);
    this.container.classList.add('show');

    cardFlipButton.addEventListener('click', () => {
      card.classList.add('flipped');
    });
  }

  flipCardBack(backCard: HTMLElement, cardContainer: HTMLElement): void {
    backCard.addEventListener('mouseout', () => {
      cardContainer.classList.remove('flipped');
      this.container.classList.add('show');
    });
  }

  playSound(button: HTMLElement, index: number, i: number): void {
    button.addEventListener('click', () => {
      const audio = new Audio();
      audio.src = DESCRIPTION[index][i].audioSrc;
      audio.currentTime = 0;
      audio.play();
    });
    this.container.classList.add('show');
  }

  render(): HTMLElement {
    this.renderTrainMode(this.container);
    return this.container;
  }
}

export default Train;

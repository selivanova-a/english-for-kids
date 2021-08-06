import Component from '../../core/templates/components';
import CategoryPage, { DESCRIPTION, IMAGES } from './index';
import { NAMES } from '../main';

const CORRECT_SOUND = 'audio/correct.mp3';
const ERROR_SOUND = 'audio/error.mp3';
const LOSE_IMAGE = 'url(\'/img/lose.jpg\')';
const WIN_IMAGE = 'url(\'/img/epic-win.jpg\')';

const RIGHT_CLASS = 'correct';
const WRONG_CLASS = 'error';
const ALL_RIGHT_ANSWERS = 8;
const SHOW_TIME = 3000;

enum MainRouteLinks {
  MainPage = '#main-page',
  Categories = '#category-page',
}

class Play extends Component {
  constructor() {
    super('div', 'cards-wrapper');
  }

  number = 0;

  RandomArray: number[] = [];

  correctPoints = 0;

  errorPoints = 0;

  rightAnswer = 0;

  static TextObject = {
    ErrorText: (errorPoints: number): string => `Errors: ${errorPoints}`,
    StartButton: 'START',
    RepeatButton: 'REPEAT',
  };

  renderPlayMode(): void {
    this.container.innerHTML = '';
    const index = CategoryPage.switchPageIndex;
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards';

    for (let i = 0; i < NAMES.length; i += 1) {
      const card = document.createElement('a');
      card.className = 'play-card';
      card.style.backgroundImage = `url(/${IMAGES[index][i].image})`;
      cardsWrapper.append(card);
      card.addEventListener('click', () => {
        this.compareAnswer(i, card);
      });
    }

    this.container.append(cardsWrapper);
  }

  renderStartButton(): void {
    const startButton = document.createElement('button');
    startButton.textContent = Play.TextObject.StartButton;
    startButton.className = 'button';
    this.container.append(startButton);

    startButton.addEventListener('click', () => {
      startButton.classList.add('hidden');
      this.selectRandomArray(this.RandomArray);
      this.renderRepeatButton();
    });
  }

  renderRepeatButton(): void {
    const repeatButton = document.createElement('button');
    repeatButton.textContent = Play.TextObject.RepeatButton;
    repeatButton.className = 'button repeat';
    this.container.append(repeatButton);

    repeatButton.addEventListener('click', () => {
      this.playSound(DESCRIPTION[CategoryPage.switchPageIndex][this.rightAnswer].audioSrc);
    });
  }

  renderResponseStatistic(): void {
    const answerWrapper = document.createElement('div');
    answerWrapper.className = 'answers';
    this.container.append(answerWrapper);
  }

  renderAnswer(state: string): void {
    const answer = document.createElement('div');
    answer.className = 'answers__item';
    answer.classList.add(state);
    this.container.append();
    const wrapper = document.querySelector('.answers');
    if (wrapper) { wrapper.append(answer); }
  }

  mixWords(): void {
    const index = CategoryPage.switchPageIndex;
    const numbers = [];
    for (let i = 0; i < DESCRIPTION[index].length; i += 1) {
      numbers.push(i);
    }
    const playIndexes = numbers.sort(() => Math.random() - 0.5);
    this.RandomArray = playIndexes;
  }

  selectRandomArray(mixArray: number[]): void {
    if (this.number === ALL_RIGHT_ANSWERS) {
      this.showWinMessage();
    }
    const index = CategoryPage.switchPageIndex;
    const fifthIndex = mixArray[this.number];
    this.rightAnswer = mixArray[this.number];
    const randomSound = DESCRIPTION[index][fifthIndex].audioSrc;
    this.playSound(randomSound);
  }

  compareAnswer(i: number, card: HTMLElement): void {
    if (this.rightAnswer === i) {
      this.playSound(CORRECT_SOUND);
      this.number += 1;
      this.correctPoints += 1;
      this.renderAnswer(RIGHT_CLASS);
      card.classList.add('right-answer');
      this.selectRandomArray(this.RandomArray);
    } else {
      this.playSound(ERROR_SOUND);
      this.renderAnswer(WRONG_CLASS);
      this.errorPoints += 1;
    }
  }

  showWinMessage(): void {
    if (this.correctPoints === ALL_RIGHT_ANSWERS && this.errorPoints === 0) {
      this.container.innerHTML = '';
      const winWrapper = document.createElement('div');
      winWrapper.className = 'epic-win';
      winWrapper.style.backgroundImage = WIN_IMAGE;
      this.container.append(winWrapper);
      this.playSound('audio/success.mp3');
      setTimeout(() => {
        document.location.href = `${MainRouteLinks.MainPage}`;
      }, SHOW_TIME);
    }

    if (this.correctPoints === ALL_RIGHT_ANSWERS && this.errorPoints !== 0) {
      this.container.innerHTML = '';
      const winWrapper = document.createElement('div');
      const showErrors = document.createElement('span');
      showErrors.textContent = Play.TextObject.ErrorText(this.errorPoints);
      showErrors.className = 'show-errors';
      winWrapper.className = 'epic-win';
      winWrapper.style.backgroundImage = LOSE_IMAGE;
      this.container.append(winWrapper, showErrors);
      this.playSound('audio/failure.mp3');
      setTimeout(() => {
        document.location.href = `${MainRouteLinks.MainPage}`;
      }, SHOW_TIME);
    }
  }

  playSound(link: string): void {
    const audio = new Audio();
    audio.src = link;
    audio.currentTime = 0;
    audio.play();
    this.container.append();
  }

  render(): HTMLElement {
    this.renderPlayMode();
    this.renderStartButton();
    this.renderResponseStatistic();
    this.mixWords();
    return this.container;
  }
}

export default Play;

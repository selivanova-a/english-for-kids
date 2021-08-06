import Component from '../../templates/components';
import personalData from '../../constants/settings';

class Footer extends Component {
  constructor() {
    super('div', 'footer-container');
  }

  renderFooter(): void {
    const rssLink = document.createElement('a');
    rssLink.href = personalData.schoolLink;
    rssLink.target = '_blank';
    rssLink.className = 'rss';
    const rssYear = document.createElement('span');
    rssYear.className = 'rss-year';
    rssYear.textContent = personalData.schoolYear;

    const github = document.createElement('a');
    github.className = 'github-icon';
    github.href = personalData.githubLink;
    github.target = '_blank';
    const githubIcon = document.createElement('i');
    githubIcon.className = 'fab fa-github';

    rssLink.append(rssYear);
    github.append(githubIcon);
    this.container.append(rssLink, github);
  }

  render(): HTMLElement {
    this.renderFooter();
    return this.container;
  }
}

export default Footer;

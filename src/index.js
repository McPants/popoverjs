import './polyfills';

import Renderer from './renderer';
import Positioner from './positioner';

import { error } from './utils';

import './styles/main.scss';

const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
  showDelay: 0,
  hideDelay: 200,
  unnecessaryRepositioning: false,
  resizePositioning: true,
  onBeforeHide: () => {},
  onBeforeShow: () => {},
  onAfterHide: () => {},
  onAfterShow: () => {},
};

const requiredOptions = [
  'attachmentElement',
  'popoverElement',
];

class Popoverjs {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);

    this.checkForRequiredOptions();
    this.initialize();
  }

  checkForRequiredOptions() {
    const optionKeys = Object.keys(this.options);

    requiredOptions.forEach((option) => {
      if (!optionKeys.includes(option)) {
        error(`Must supply ${option} option to Popoverjs`);
      }
    });
  }

  initialize() {
    this.setUpGlobals();
    this.setUpRenderer();
  }

  setUpGlobals() {
    if (!this.options.triggerElement) {
      this.options.triggerElement = this.options.attachmentElement;
    }
  }

  position() {
    if (!this.Positioner) { return; }

    this.Positioner.position();
  }

  get rendererOptions() {
    return Object.assign({}, this.options, {
      onToggleEnd: this.onToggleEnd.bind(this),
      onRender: this.onRender.bind(this),
    });
  }

  onToggleEnd() {
    this.Positioner.disable();
  }

  onRender() {
    this.setUpPositioner();
  }

  setUpRenderer() {
    this.renderer = new Renderer(this.rendererOptions);
  }

  get positionerOptions() {
    return Object.assign({}, this.options);
  }

  setUpPositioner() {
    this.Positioner = new Positioner(this.positionerOptions);
    this.Positioner.enable();
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;

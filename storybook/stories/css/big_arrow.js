import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

import './styles.scss';

const popoverOptions = {
  themeClass: 'popoverjs--bigArrow',
  constraints: [{
    popover: 'top left',
    attachment: 'bottom left',
  }, {
    popover: 'top right',
    attachment: 'bottom right',
  }],
};

storiesOf('Custom SCSS', module)
  .add('Big Arrow', () => (
    <div>
      <PopoverjsReact popoverOptions={popoverOptions}>
        <div className="demo-trigger">I am the trigger</div>
        <div className="demo-content">I am the content</div>
      </PopoverjsReact>
    </div>
  ));

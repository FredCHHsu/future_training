// ref: https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
// colors: http://www.material-ui.com/#/customization/colors

import {
  grey600, grey200,
  fullWhite,
  indigoA400, indigoA200,
  deepOrange300, deepOrange500, deepOrange700,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

const gameTheme = { // customize dark base theme
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: indigoA400,
    primary2Color: indigoA200,
    primary3Color: grey600,
    accent1Color: deepOrange500,
    accent2Color: deepOrange700,
    accent3Color: deepOrange300,
    textColor: grey200,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: fullWhite, // app bar title
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
};

export default gameTheme;

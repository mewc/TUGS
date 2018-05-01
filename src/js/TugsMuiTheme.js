import {grey50, grey200, grey400, grey700, grey900,
    red900, red600, red400,
    teal900, teal600, teal400,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Josefin Sans, Roboto, sans-serif', //fetched from script in index.html
    palette: {
        primary1Color: red900,
        primary2Color: grey700,
        primary3Color: grey400,
        accent1Color: grey200,
        accent2Color: teal600,
        accent3Color: teal900,
        textColor: grey900,
        alternateTextColor: grey50,
        canvasColor: grey50,
        borderColor: grey200,
        disabledColor: fade(grey900, 0.2),
        pickerHeaderColor: teal600,
        clockCircleColor: fade(grey900, 0.4),
        shadowColor: grey900
    },
};
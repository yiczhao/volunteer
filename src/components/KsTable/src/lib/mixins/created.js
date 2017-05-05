var is_empty = require('../helpers/is-empty');

module.exports = {

  created: function() {

    if (is_empty(this.options.columnsDisplay))  return;

    this.columnsDisplay = getColumnsDisplay(this.options.columnsDisplay);

    window.addEventListener('resize', function() {
        this.windowWidth = window.innerWidth;
      }.bind(this));
  }
}

function getColumnsDisplay(columnsDisplay) {
     var res = {};
     var range;
     var device;
     var operator;

    for (var column in columnsDisplay) {
      operator = getOperator(columnsDisplay[column]);
      try {
      device = getDevice(columnsDisplay[column]);
      range = getRange(device, operator);
      res[column] = range.concat([operator]);
      } catch (err) {
        console.warn('Unknown device ' + device);
      }

    }

    return res;
}


function getRange(device, operator) {

  var devices = {
    desktop:[1024, null],
    tablet:[480, 1024],
    mobile:[0, 480],
    tabletL:[768, 1024],
    tabletP:[480, 768],
    mobileL:[320, 480],
    mobileP:[0, 320]
  }

    switch (operator) {
      case 'min':
      return [devices[device][0], null];
      case 'max':
      return [0, devices[device][1]];
      default:
      return devices[device];
    }

}

function getOperator(val) {

    var pieces = val.split('_');

    if (['not','min','max'].indexOf(pieces[0])>-1)
      return pieces[0];

    return false;
}

function getDevice(val) {
    var pieces = val.split('_');
    return pieces.length>1?pieces[1]:pieces[0];
}

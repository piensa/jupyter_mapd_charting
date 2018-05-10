var jupyter_mapd_charting = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'jupyter_mapd_charting',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter_mapd_charting',
          version: jupyter_mapd_charting.version,
          exports: jupyter_mapd_charting
      });
  },
  autoStart: true
};


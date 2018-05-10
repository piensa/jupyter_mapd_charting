var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var d3 = require('d3');

const BarChartModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'BarChartModel',
        _view_name : 'BarChartView',
        _model_module : 'jupyter_mapd_charting',
        _view_module : 'jupyter_mapd_charting',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        value : 'Hello World'
    })
});

var BarChartView = widgets.DOMWidgetView.extend({
    render: function() {
        var container = d3.select(this.el);
        //
        container.html("FIRST LINE <br> SECOND LINE")
        var data = this.model.get("_model_data");
    }
});

module.exports = {
    BarChartModel: BarChartModel,
    BarChartView: BarChartView
};

var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var d3 = require('d3');

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var BarChartModel = widgets.DOMWidgetModel.extend({
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


// Custom View. Renders the widget model.
var BarChartView = widgets.DOMWidgetView.extend({
    render: function() {
        // this.value_changed();
        // this.model.on('change:value', this.value_changed, this);

        var container = d3.select(this.el);
        container.html("FIRST LINE <br> SECOND LINE");
        var data = this.model.get("_model_data");
        console.log('lo que imprimio', data);
    },

    // value_changed: function() {
    //     this.el.textContent = this.model.get('value');
    // }
});


module.exports = {
    BarChartModel : BarChartModel,
    BarChartView : BarChartView
};

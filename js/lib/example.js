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

        const data = this.getData(this.model.get('_model_data'));

        console.log('data', data);

        const container = d3.select(this.el);
        const margin = ({top: 20, right: 0, bottom: 30, left: 40});
        const height = 400;
        const width = 700;

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1);
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        const svg = container.append('svg').attr("width", width).attr("height", height);

        svg.append("g")
            .attr("fill", "steelblue")
        .selectAll("rect").data(data).enter().append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value))
            .attr("width", x.bandwidth());

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove());

        svg.append("g").call(xAxis);

        svg.append("g").call(yAxis);
    },
    getData: function (data) {
        if (!data) {
            return [];
        }

        data.columns = Object.keys(data[0]);

        return data.slice()
          .sort((a, b) => b.frequency - a.frequency)
          .map(({letter, frequency}) => ({name: letter, value: frequency}));
    }
});




module.exports = {
    BarChartModel : BarChartModel,
    BarChartView : BarChartView
};

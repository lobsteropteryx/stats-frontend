const display = (cards) => {
    buildChart(rollupByMonth(cards));
};

const buildChart = (data) => {
    const svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(d => d.key));
    y.domain([0, d3.max(data, d => d.value)]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Count");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value));
};

const rollupByMonth = (cards) => {
    return d3.nest()
        .key(d => d.date.format('YYYY-MM'))
        .rollup(v => v.length)
        .entries(getBugs(cards));
};

const getBugs = (cards) => {
    var regex = new RegExp('\\bBUG\\b', 'i');
    return cards
        .filter((card) => {
            return regex.test(card.name);
        })
        .map((card) => {
            return {
                date: getCreateDate(card.id),
                url: card.url
            }
        })
};

const getCreateDate = (id) => {
    return moment(1000 * parseInt(id.substring(0, 8), 16));
};

const authenticationSuccess = () => {
    var ashesID = '597755a8422f9194d7ff34cf';
    trello.get(`/boards/${ashesID}/cards`, display);
};

const authenticationFailure = () => {
    console.log('Failed authentication');
};

const trello = window.Trello;

trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
        read: 'true',
        write: 'true'
    },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
});


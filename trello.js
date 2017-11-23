const display = (cards) => {
    const displayData = rollupByMonth(cards);

    buildChart(displayData);

    const pre = document.createElement('pre');
    pre.innerText = JSON.stringify(displayData, null, 4);
    document.body.appendChild(pre);
};

const buildChart = (data) => {
    const width = 420;
    const barHeight = 20;

    const x = d3.scaleLinear()
        .range([0, width]);

    const chart = d3.select(".chart")
        .attr("width", width);

    x.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

    chart.attr("height", barHeight * data.length);

    const bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * barHeight + ")";
        });

    bar.append("rect")
        .attr("width", function (d) {
            return x(d.value);
        })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function (d) {
            return x(d.value) - 3;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) {
            return d.value;
        });
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


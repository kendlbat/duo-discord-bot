/* import { XpSummary } from "./types";
import { getXpSummaries } from "./duolingo";
import d3 from "d3";

/* const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 800,
    height: 400,
    backgroundColour: "#131f24",
}); 

const width = 800;
const height = 400;

const margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20,
};

function getShortWeekday(date: Date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
}

async function configToChart(config: any) {
    return chartJSNodeCanvas.renderToBufferSync(config);
}

export async function createSingleUserChart(xp_summaries: XpSummary[]) {
    console.log(xp_summaries);
    const x = d3.scaleLinear();
    const y = d3.scaleLinear([0, d3.max(xp_summaries, (d) => d.gainedXp)]);

    const config = {
        type: "line",
        data: {
            labels: xp_summaries.map((summary) =>
                // Get date from timestamp
                getShortWeekday(new Date(summary.date * 1000))
            ),
            datasets: [
                {
                    label: "XP",
                    data: xp_summaries.map((summary) => summary.gainedXp),
                    fill: true,
                    borderColor: "#1cb0f6",
                    borderWidth: 2,
                    pointBackgroundColor: "#1cb0f6",
                },
            ],
        },
        // hide legend
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        color: "#2b2b2b",
                    },
                },
            },
        },
    };

    console.log(config);

    return await configToChart(config);
}

async function test() {
    const data = await getXpSummaries("902544029");
    const chart = await createSingleUserChart(data);
    console.log(chart);
    // Open the chart in a browser
    (await import("fs")).writeFileSync("chart.png", chart);
    console.log("Chart saved to chart.png");
} */

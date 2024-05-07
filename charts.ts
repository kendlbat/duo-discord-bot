import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { XpSummary } from "./types";
import { getXpSummaries } from "./duolingo";

const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 800,
    height: 400,
    backgroundColour: "#131f24",
});

function getShortWeekday(date: Date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
}

async function configToChart(config: any) {
    return chartJSNodeCanvas.renderToBufferSync(config);
}

export async function createSingleUserChart(xp_summaries: XpSummary[]) {
    console.log(xp_summaries);
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
}

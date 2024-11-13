// Объект с ссылками
const references = {
    1: "https://pioneerindsys.com/the-history-of-robotics-and-automation-a-comprehensive-timeline/",
    2: "https://www.intellspot.com/what-is-robotics/",
    3: "https://keybotic.com/history-of-robotics-a-comprehensive-history-of-evolution-and-innovation/",
    4: "https://www.pcworld.com/article/469885/historys_10_most_influential_robots.html",
    5: "https://techietory.com/robotics/the-history-of-robotics-from-ancient-times-to-modern-innovations/",
    6: "https://www.uti.edu/blog/robotics-and-automation/robotics-basics",
    7: "https://en.wikipedia.org/wiki/History_of_robots",
    8: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-ai",
    9: "https://iabac.org/blog/differences-between-robotics-and-artificial-intelligence",
    10: "https://www.techtarget.com/whatis/definition/robotics",
    11: "https://aiforsocialgood.ca/blog/artificial-intelligence-and-robotics-a-battle-for-technological-supremacy",
    12: "https://www.coursera.org/articles/what-is-artificial-intelligence",
    13: "https://builtin.com/artificial-intelligence",
    14: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    15: "https://www.mckinsey.com/capabilities/operations/our-insights/human-plus-machine-a-new-era-of-automation-in-manufacturing",
    16: "https://www.forbes.com/sites/bernardmarr/2023/05/10/15-amazing-real-world-applications-of-ai-everyone-should-know-about/",
    17: "https://allyrobotics.com/artificial-intelligence-vs-robotics/",
    18: "https://copperdigital.com/blog/ethical-implications-ai-decision-making-manufacturing/",
    19: "https://plato.stanford.edu/entries/ethics-ai/",
    20: "https://journalofethics.ama-assn.org/article/how-should-surgeons-consider-emerging-innovations-artificial-intelligence-and-robotics/2023-08",
    21: "https://www.brookings.edu/articles/countering-the-geographical-impacts-of-automation-computers-ai-and-place-disparities/",
    22: "https://www.chicagofed.org/publications/blogs/chicago-fed-insights/2023/the-automation-of-jobs",
    23: "https://ai100.stanford.edu/gathering-strength-gathering-storms-one-hundred-year-study-artificial-intelligence-ai100-2021-1-1",
    24: "https://blogs.cdc.gov/niosh-science-blog/2022/02/15/tjd-fow/",
    25: "https://tcf.org/content/report/robots-beginning-affect-workers-wages/",
    26: "https://toolingideas.com/what-are-the-key-components-and-features-of-a-robot/",
    27: "https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2023.1084000/full",
    28: "https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2023.1084000/full",
    29: "https://techietory.com/robotics/understanding-robot-anatomy-essential-components-explained/",
    30: "https://www.vaia.com/en-us/explanations/engineering/robotics-engineering/robot-sensors/",
    31: "https://roboticsbiz.com/sensors-in-robotics-7-common-sensors-used-in-robots/",
    32: "https://www.mckinsey.com/capabilities/operations/our-insights/automation-robotics-and-the-factory-of-the-future",
    33: "https://www.vaia.com/en-us/explanations/engineering/mechanical-engineering/robotic-sensors/",
    34: "https://www.v7labs.com/blog/ai-in-robotics",
    35: "https://builtin.com/robotics"
};

// Функция для замены текстовых ссылок на кликабельные везде на странице
function convertReferencesToLinksInBody() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while ((node = walker.nextNode())) {
        const parent = node.parentNode;

        // Проверяем, что родительский элемент допускает вставку HTML
        if (parent && parent.nodeName !== "SCRIPT" && parent.nodeName !== "STYLE") {
            const text = node.nodeValue;

            // Заменяем [число] на кликабельные ссылки
            const updatedText = text.replace(/\[(\d+)\]/g, (match, number) => {
                const url = references[number];
                if (url) {
                    return `<a href="${url}" target="_blank">${match}</a>`;
                }
                return match; // Если ссылки нет, оставить текст как есть
            });

            // Если текст изменился, заменяем его HTML
            if (updatedText !== text) {
                const span = document.createElement("span");
                span.innerHTML = updatedText;
                parent.replaceChild(span, node);
            }
        }
    }
}

// Вызов функции после загрузки DOM
document.addEventListener("DOMContentLoaded", convertReferencesToLinksInBody);

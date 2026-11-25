let cpuData = [];

document.addEventListener("DOMContentLoaded", function () {

    fetch("procesoare.xml")
        .then(r => r.text())
        .then(str => {

            const xml = new DOMParser().parseFromString(str, "text/xml");
            const cpus = xml.getElementsByTagName("cpu");

            const select = document.getElementById("cpuSelect");

            for (let i = 0; i < cpus.length; i++) {

                const name = cpus[i].getElementsByTagName("name")[0].textContent;
                const budget = cpus[i].getElementsByTagName("budget")[0].textContent;
                const mid = cpus[i].getElementsByTagName("mid")[0].textContent;
                const high = cpus[i].getElementsByTagName("high")[0].textContent;

                cpuData.push({ name, budget, mid, high });

                let opt = document.createElement("option");
                opt.value = name;
                opt.textContent = name;
                select.appendChild(opt);
            }
        });
});

function openBuild(type) {

    const selected = document.getElementById("cpuSelect").value;

    const cpu = cpuData.find(c => c.name === selected);

    if (!cpu) return;

    let url = "";

    if (type === "budget") url = cpu.budget;
    if (type === "mid") url = cpu.mid;
    if (type === "high") url = cpu.high;

    window.open(url, "_blank");
}
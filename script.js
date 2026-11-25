let gpuData = [];

document.addEventListener("DOMContentLoaded", function () {

    loadXML();

    setTimeout(() => {
        initChart();
    }, 100);

});

function loadXML() {

    fetch("recomandari.xml")
        .then(r => r.text())
        .then(str => {

            const xml = new DOMParser().parseFromString(str, "text/xml");
            const gpus = xml.getElementsByTagName("gpu");

            const select = document.getElementById("gpuSelect");

            for (let i = 0; i < gpus.length; i++) {

                const nameNode = gpus[i].getElementsByTagName("name")[0];
                const cpuNode = gpus[i].getElementsByTagName("cpu")[0];
                const passNode = gpus[i].getElementsByTagName("passmark")[0];
                const fpsNode = gpus[i].getElementsByTagName("fps")[0];

                if (!nameNode || !cpuNode || !passNode) continue;

                const name = nameNode.textContent;
                const cpu = cpuNode.textContent;
                const passmark = passNode.textContent;

                let fps = null;

                if (fpsNode) {
                    fps = {
                        gta5: fpsNode.getAttribute("gta5") || "0",
                        cs2: fpsNode.getAttribute("cs2") || "0",
                        cyberpunk: fpsNode.getAttribute("cyberpunk") || "0"
                    };
                }

                gpuData.push({ name, cpu, passmark, fps });

                if (select) {
                    let opt = document.createElement("option");
                    opt.value = name;
                    opt.textContent = name;
                    select.appendChild(opt);
                }
            }

            console.log("GPU LOADED:", gpuData);
        })
        .catch(err => console.log("XML ERROR:", err));
}


function showData() {

    const select = document.getElementById("gpuSelect");
    const result = document.getElementById("result");
    const fpsBox = document.getElementById("fpsContainer");

    if (!select || !result || !fpsBox) return;

    const gpu = gpuData.find(g => g.name === select.value);

    if (!gpu) {
        result.innerHTML = "Se încarcă datele...";
        return;
    }

    result.innerHTML = `
        <h2>${gpu.name}</h2>
        <p>CPU: ${gpu.cpu}</p>
        <p>PassMark: ${gpu.passmark}</p>
    `;

    if (gpu.fps) {
        fpsBox.innerHTML = `
            <div>GTA5: ${gpu.fps.gta5} FPS</div>
            <div>CS2: ${gpu.fps.cs2} FPS</div>
            <div>Cyberpunk: ${gpu.fps.cyberpunk} FPS</div>
        `;
    } else {
        fpsBox.innerHTML = "";
    }
}

const NAVS = [
    {
        selector: "#home_btn",
        dest: "#home",
    },
    {
        selector: "#home #img13",
        dest: "#menu",
        action: () => {
            document.querySelector("#bg_audio")?.play();
        },
    },
    {
        selector: "#menu #img21",
        dest: "#keluar",
    },
    {
        selector: "#menu #img22",
        dest: "#selesai",
    },
    {
        selector: "#menu .menu .menu-item:nth-child(1)",
        dest: "#petunjuk1",
    },
    {
        selector: "#menu .menu .menu-item:nth-child(2)",
        dest: "#tujuan",
    },
    {
        selector: "#menu .menu .menu-item:nth-child(3)",
        dest: "#petakonsep",
    },
    {
        selector: "#menu .menu .menu-item:nth-child(4)",
        dest: "#sempurna",
    },
    {
        selector: "#menu .menu .menu-item:nth-child(5)",
        dest: "#simulasi",
    },
    {
        selector: "#menu .menu .menu-item:nth-child(6)",
        dest: "#kuis1",
    },
    {
        selector: "#keluar #img21",
        dest: "#home",
    },
    {
        selector: "#keluar #img22",
        dest: "#menu",
    },
    {
        selector: "#petunjuk1 #img21",
        dest: "#menu",
    },
    {
        selector: "#petunjuk1 #img22",
        dest: "#petunjuk2",
    },
    {
        selector: "#petunjuk2 #img21",
        dest: "#petunjuk1",
    },
    {
        selector: "#petunjuk2 #img22",
        dest: "#menu",
    },
    {
        selector: "#tujuan #img21",
        dest: "#menu",
    },
    {
        selector: "#petakonsep #img21",
        dest: "#menu",
    },
    {
        selector: "#petakonsep .peta-konsep .peta-konsep-item:nth-child(1)",
        dest: "#sempurna",
    },
    {
        selector: "#petakonsep .peta-konsep .peta-konsep-item:nth-child(2)",
        dest: "#tidaksempurna",
    },
    {
        selector: "#sempurna #img21",
        dest: "#petakonsep",
    },
    {
        selector: "#sempurna #img22",
        dest: "#contohsempurna",
    },
    {
        selector: "#sempurna button",
        dest: "#contohsempurna",
    },
    {
        selector: "#contohsempurna #img21",
        dest: "#sempurna",
    },
    {
        selector: "#contohsempurna #img22",
        dest: "#tahapansempurna",
    },
    {
        selector: "#tahapansempurna #img21",
        dest: "#contohsempurna",
    },
    {
        selector: "#tahapansempurna #img22",
        dest: "#paham",
    },
    {
        selector: "#tidaksempurna #img21",
        dest: "#petakonsep",
    },
    {
        selector: "#tidaksempurna #img22",
        dest: "#contohtidaksempurna",
    },
    {
        selector: "#tidaksempurna button",
        dest: "#contohtidaksempurna",
    },
    {
        selector: "#contohtidaksempurna #img21",
        dest: "#tidaksempurna",
    },
    {
        selector: "#contohtidaksempurna #img22",
        dest: "#tahapantidaksempurna",
    },
    {
        selector: "#tahapantidaksempurna #img21",
        dest: "#contohtidaksempurna",
    },
    {
        selector: "#tahapantidaksempurna #img22",
        dest: "#paham",
    },
    {
        selector: "#paham #img21",
        dest: "#petakonsep",
    },
    {
        selector: "#paham #img22",
        dest: "#simulasi",
    },
    {
        selector: "#simulasi #img21",
        dest: "#menu",
    },
    {
        selector: "#simulasi #img22",
        dest: "#game1",
    },
    {
        selector: "#akhir #img21",
        dest: "#petakonsep",
    },
    {
        selector: "#akhir #img22",
        dest: "#selesai",
    },
];

NAVS.forEach((nav) => {
    const trigger = document.querySelectorAll(nav.selector);
    const destEl = document.querySelector(nav.dest);

    if (trigger && destEl) {
        trigger.forEach((d) => {
            d.addEventListener("click", function () {
                playClickSound();
                if (nav.action) {
                    nav.action();
                }
                const allSlides = [...document.querySelectorAll(".slides > section")];
                const hIndex = allSlides.indexOf(destEl);
                if (hIndex !== -1) {
                    Reveal.slide(hIndex);
                }
            });
        });
    }
});

function setDragNDrop(id, correctOrder, btnId, dest) {
    const container = document.querySelector(id);
    let dragSrc = null;

    container.addEventListener("dragstart", function (e) {
        if (e.target.tagName === "IMG") {
            dragSrc = e.target;
            e.dataTransfer.setData("text/plain", e.target.title);
            e.target.classList.add("dragging");
        }
    });

    container.addEventListener("dragend", function (e) {
        if (e.target.tagName === "IMG") {
            e.target.classList.remove("dragging");
        }
    });

    container.addEventListener("dragover", function (e) {
        if (e.target.tagName === "IMG") {
            e.preventDefault();
        }
    });

    container.addEventListener("drop", function (e) {
        if (e.target.tagName !== "IMG" || !dragSrc || dragSrc === e.target) {
            return;
        }

        e.preventDefault();

        const dragSrcParent = dragSrc.parentNode;
        const targetParent = e.target.parentNode;
        const dragSrcNext = dragSrc.nextSibling;
        const targetNext = e.target.nextSibling;

        dragSrcParent.insertBefore(e.target, dragSrcNext);
        targetParent.insertBefore(dragSrc, targetNext);
    });

    const checkBtn = document.querySelector(btnId || "#check-order");
    checkBtn.addEventListener("click", () => {
        const currentOrder = Array.from(container.querySelectorAll("img")).map((img) => img.title);
        if (arraysEqual(currentOrder, correctOrder)) {
            document.querySelector("#jawaban-benar").classList.add("show");
            setTimeout(() => {
                document.querySelector("#jawaban-benar").classList.remove("show");
                playBenarSound();
                if (dest) {
                    const destEl = document.querySelector(dest);
                    const allSlides = [...document.querySelectorAll(".slides > section")];
                    const hIndex = allSlides.indexOf(destEl);
                    if (hIndex !== -1) {
                        Reveal.slide(hIndex);
                    }
                }
            }, 3000);
        } else {
            document.querySelector("#jawaban-salah").classList.add("show");
            playSalahSound();
            setTimeout(() => {
                document.querySelector("#jawaban-salah").classList.remove("show");
            }, 3000);
        }
    });
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

setDragNDrop("#drag-game1", ["Telur", "Larva", "Kepompong", "Kupu-Kupu"], "#check-game1", "#game2");
setDragNDrop("#drag-game2", ["Telur", "Kecoa Kecil", "Kecoa Dewasa"], "#check-game2", "#kuis1");

function setKuis(id, correctAns, dest) {
    const container = document.querySelector(id);
    const options = container.querySelectorAll(".option");

    options.forEach((d) => {
        d.addEventListener("click", function (e) {
            if (d.dataset.option === correctAns) {
                document.querySelector("#jawaban-benar").classList.add("show");
                playBenarSound();
                setTimeout(() => {
                    document.querySelector("#jawaban-benar").classList.remove("show");
                    if (dest) {
                        const destEl = document.querySelector(dest);
                        const allSlides = [...document.querySelectorAll(".slides > section")];
                        const hIndex = allSlides.indexOf(destEl);
                        if (hIndex !== -1) {
                            Reveal.slide(hIndex);
                        }
                    }
                }, 3000);
            } else {
                document.querySelector("#jawaban-salah").classList.add("show");
                playSalahSound();
                setTimeout(() => {
                    document.querySelector("#jawaban-salah").classList.remove("show");
                }, 3000);
            }
        });
    });
}

setKuis("#kuis1", "C", "#kuis2");
setKuis("#kuis2", "B", "#akhir");

function playClickSound() {
    const clickAudio = document.querySelector("#click_audio");
    if (!clickAudio) return;
    if (clickAudio.readyState >= 2) {
        clickAudio.currentTime = 0;
        clickAudio.play();

        setTimeout(() => {
            if (!clickAudio.paused) {
                clickAudio.pause();
            }
        }, 1000);
    }
}

function playBenarSound() {
    const benarAudio = document.querySelector("#benar_audio");
    if (!benarAudio) return;
    if (benarAudio.readyState >= 2) {
        benarAudio.currentTime = 0;
        benarAudio.play();

        setTimeout(() => {
            if (!benarAudio.paused) {
                benarAudio.pause();
            }
        }, 2000);
    }
}

function playSalahSound() {
    const salahAudio = document.querySelector("#salah_audio");
    if (!salahAudio) return;
    if (salahAudio.readyState >= 2) {
        salahAudio.currentTime = 0;
        salahAudio.play();

        setTimeout(() => {
            if (!salahAudio.paused) {
                salahAudio.pause();
            }
        }, 2000);
    }
}

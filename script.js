const startButton = document.getElementById("start-button");
const endButton = document.getElementById("end-button");

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOMContentLoaded");
});


startButton.addEventListener("click", () => {
	console.log("クリックされました");
	navigator.clipboard.writeText(endButton.textContent)
        .then(() => {
            console.log("テキストをカットしました");
            // オリジナルのテキストをクリア
            // カスタムカットイベントを発火
            document.dispatchEvent(new Event("cut"));
        })
        .catch(err => {
            console.error("テキストのカットに失敗しました: ", err);
        });
});

document.addEventListener("cut", () => {
	console.log("cut");
});

document.addEventListener("scroll", () => {
	console.log("scroll");
});


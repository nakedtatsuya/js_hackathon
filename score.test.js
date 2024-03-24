const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

  
	await page.evaluateOnNewDocument(() => {
		const originalAddEventListener = EventTarget.prototype.addEventListener;
		// ブラウザのコンテキスト内でのみ存在する変数
		const eventCounts = {};

		EventTarget.prototype.addEventListener = function (
			type,
			listener,
			options,
		) {
			const wrappedListener = function(event) {
        // イベントタイプごとに発火回数を記録
        console.log('イベント発火');
        if (!eventCounts[type]) {
            eventCounts[type] = 0;
        }
        eventCounts[type]++;

        // 元のリスナーを呼び出す
        listener.call(this, event);
    };

    listener.wrappedListener = wrappedListener;
    originalAddEventListener.call(this, type, wrappedListener, options);
		};
	});
  await page.goto("http://127.0.0.1:5500/", { waitUntil: "networkidle0" });
	// ページでコンソールに出力されたメッセージを捕捉
	page.on("console", (msg) => {
		const text = msg.text();
		// "EVENT FIRED:"で始まるメッセージを探す
		if (text.startsWith("EVENT FIRED:")) {
			console.log("Puppeteer captured:", text);
			// ここで必要な処理を行う
		}
    console.log("Puppeteer captured:", text);
	});

	// ページでのアクションをシミュレート
	await page.evaluate(() => {
    document.body.click();
    
	});

	await browser.close();
})();

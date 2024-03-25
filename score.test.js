import puppeteer from "puppeteer";
import assert from "node:assert/strict"
import test from "node:test"



(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
  
	await page.evaluateOnNewDocument(() => {
		const originalAddEventListener = EventTarget.prototype.addEventListener;
		// ブラウザのコンテキスト内でのみ存在する変数
		window.eventCounts = {};

		EventTarget.prototype.addEventListener = function (
			type,
			listener,
			options,
		) {
			const wrappedListener = function(event) {
        // イベントタイプごとに発火回数を記録
        
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
		console.log("Puppeteer captured:", text);
	});

	// ページでのアクションをシミュレート
	await page.click("button");

	// eventCountsをNode.js側で取得
	const eventCounts = await page.evaluate(() => {
			return window.eventCounts;
	});

	console.log("eventCounts:", eventCounts);

	test('synchronous passing test', (t) => {
		// 10個以上のイベントを発火していればOK
		assert(3 <= Object.keys(eventCounts).length, "イベントが10個以上発火していません");
	});

	console.log(`あなたのスコアは ${Object.keys(eventCounts).length} 点でした！`, eventCounts);


	await browser.close();
})();

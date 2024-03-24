console.log("Hello, World!");

// for (key in window) {
//   console.log(key);
//   if(typeof window[key] === 'function') {
//     console.log(window[key]);
//     // ベースの機能を拡張する
//     window[key] = function() {
//       console.log('拡張機能');
//       // window[key]()
//     }

//   }
// }

// // イベント発火回数を記録するオブジェクト
// const eventCounts = {};

// // 元のaddEventListenerメソッドを保持
// const originalAddEventListener = EventTarget.prototype.addEventListener;
// const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

// EventTarget.prototype.addEventListener = function(type, listener, options) {
//     const wrappedListener = function(event) {
//         // イベントタイプごとに発火回数を記録
//         console.log('イベント発火');
//         if (!eventCounts[type]) {
//             eventCounts[type] = 0;
//         }
//         eventCounts[type]++;

//         // 元のリスナーを呼び出す
//         listener.call(this, event);
//     };

//     listener.wrappedListener = wrappedListener;
//     originalAddEventListener.call(this, type, wrappedListener, options);
// };

// EventTarget.prototype.removeEventListener = function(type, listener, options) {
//     originalRemoveEventListener.call(this, type, listener.wrappedListener || listener, options);
// };

// 集計データをテキストファイルとしてダウンロードさせる関数
// function downloadEventCounts() {
//     const filename = 'log.txt';
//     const contents = Object.keys(eventCounts).map(type => `${type}: ${eventCounts[type]}`).join('\n');
//     const blob = new Blob([contents], { type: 'text/plain' });

//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;

//     // ダウンロードリンクをクリックする
//     link.click();

//     // 後処理
//     URL.revokeObjectURL(link.href);
// }

// ダウンロード関数をテストするためのボタンを設置
// const downloadBtn = document.createElement('button');
// downloadBtn.textContent = 'Download Event Log';
// downloadBtn.onclick = downloadEventCounts;
// document.body.appendChild(downloadBtn);

document.addEventListener("click", () => {
	console.log("クリックされました");
});

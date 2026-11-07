// 第1段階: いまのサイトをそのまま配信するだけの最小のプログラム。
// 次の段階で、ここにアクセスコードの確認・投稿の保存・配列データの配信を追加します。
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};

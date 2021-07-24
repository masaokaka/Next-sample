import { useEffect } from "react";
const LastSalesPage = () => {
  useEffect(() => {
    fetch()
  }, []);
  return <ul></ul>;
};
export default LastSalesPage;

//クライアントサイドレンダリングとSSGを共存させることもできる。というかこのケースが一番多くなる気がする。
//SSGでデータをフェッチしてuseStateとかで初期値として持たせておいて、その後はuseEffectとかuseSWR(nextの作ったhooksでこっちのが状態管理が楽そう)
//を使って今現在のデータをとってくることでコンポーネントを更新する。

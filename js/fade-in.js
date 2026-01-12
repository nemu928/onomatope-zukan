document.addEventListener('DOMContentLoaded', () => {
    //監視対象のクラス名
    const targetClass = 'p-read-section__paragraph';
    //表示状態にするためのクラス名
    const visibleClass = 'p-read-section__paragraph--is-visible';

    //監視対象のすべての要素を取得
    const targetElements = document.querySelectorAll(`.${targetClass}`);

    //対象要素がない場合は何もしない
    if (targetElements.length === 0) {
        return;
    }

    //Intersection Observer　の設定オプション
    const options = {
        //nullは画面を監視領域とすることを意味
        root: null,
        //発火させるタイミング　top/right/bottom/left 少しでも画面に入った時点の場合は0px
        rootMargin:'70px 0px 0px 0px',
        //要素の何割が見えたら発火するか　(０は少しでも見えたら、１は全体が見えたら)
        threshold:1
    };

    //Observerが要素を検出した際に実行されるコールバック関数
    const ObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                const target = entry.target;

                //1.アニメーション発火用のクラスを付与
                target.classList.add(visibleClass);

                //2.アニメーションは一度きりなので、監視を終了
                observer.unobserve(target);
            }
        });
    };

    //Intersection Observer インスタンスの生成
    const observer = new IntersectionObserver(ObserverCallback, options);

    //すべての対象要素に対して監視を開始
    targetElements.forEach(element => {
        observer.observe(element);
    });
});
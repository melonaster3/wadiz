// 간단한 장바구니 유틸리티 (index.html, deatils.html에서 호출)
(function(){
  const KEY = 'anon_cart_v1';
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY))||[] }catch(e){ return [] } }
  function write(items){ localStorage.setItem(KEY, JSON.stringify(items)); }

  function addToCart(item){
    const items = read();
    // 동일 상품(타이틀+옵션) 병합
    const idx = items.findIndex(i => i.title===item.title && i.size===item.size && i.color===item.color);
    if(idx>-1){ items[idx].qty = Number(items[idx].qty||1) + Number(item.qty||1); }
    else{ items.push({
      title:item.title||'상품',
      price:Number(item.price||0),
      qty:Number(item.qty||1),
      size:item.size||'',
      color:item.color||'',
      image:item.image||''
    }); }
    write(items);
    // 간단한 토스트
    const toast = document.createElement('div');
    toast.textContent='장바구니에 담았습니다';
    toast.style.position='fixed'; toast.style.bottom='20px'; toast.style.left='50%'; toast.style.transform='translateX(-50%)';
    toast.style.background='#111827'; toast.style.color='#fff'; toast.style.padding='10px 14px'; toast.style.borderRadius='8px'; toast.style.zIndex='9999';
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(), 1600);
  }

  // 전역으로 노출
  window.AnonCart = { add: addToCart };
})();
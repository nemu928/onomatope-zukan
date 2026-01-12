'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================================
    // 1. モーダルを開く・閉じる
    // ===============================================
    const openModal = (modal, color) => {
        if (!modal) return;
        if (color) modal.style.setProperty('--modal-color', color);
        modal.classList.add('c-modal--is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('c-modal--is-open');
        document.body.style.overflow = '';
    };

    // 開くボタンの設定
    document.querySelectorAll('.js-modal-open').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(btn.dataset.modalTarget);
            openModal(target, btn.dataset.modalColor);
        });
    });

    // 閉じるボタンの設定
    document.querySelectorAll('.js-modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(btn.closest('.c-modal'));
        });
    });

    // ===============================================
    // 2. タブ・アコーディオン
    // ===============================================
    document.querySelectorAll('.js-tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = trigger.closest('.c-tab-switch');
            const target = document.getElementById(trigger.dataset.tabId);
            
            parent.querySelectorAll('.js-tab-trigger').forEach(t => t.classList.remove('c-tab-switch__trigger--is-active'));
            trigger.classList.add('c-tab-switch__trigger--is-active');

            parent.querySelectorAll('.c-tab-switch__content').forEach(c => c.classList.add('c-tab-switch__content--is-hidden'));
            if(target) target.classList.remove('c-tab-switch__content--is-hidden');
        });
    });

    document.querySelectorAll('.js-accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            trigger.classList.toggle('is-open');
            if(trigger.nextElementSibling) trigger.nextElementSibling.classList.toggle('is-open');
        });
    });

    // ===============================================
    // 3. スタンプ機能（localStorageエラー対策）
    // ===============================================
    const STORAGE_KEY = 'onomatope_completed_list';
    let completedList = [];
    try {
        completedList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) { console.warn("Local storage access denied."); }

    const reflect = () => {
        document.querySelectorAll('.c-card').forEach(c => c.classList.remove('is-completed'));
        document.querySelectorAll('.js-challenge-btn').forEach(b => {
            const id = b.dataset.id;
            const active = completedList.includes(id);
            b.classList.toggle('is-active', active);
            b.textContent = active ? 'はなまる！' : 'できた！';
            const card = document.querySelector(`.c-card[data-id="${id}"]`);
            if(card) card.classList.toggle('is-completed', active);
        });
    };
    reflect();

    document.querySelectorAll('.js-challenge-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            completedList = completedList.includes(id) ? completedList.filter(i => i !== id) : [...completedList, id];
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completedList)); } catch (e) {}
            reflect();
        });
    });
});

// ===============================================
// 4. ローディング演出（存在チェック付き）
// ===============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loading');
    const hero = document.querySelector('.js-hero-content');
    
    // ★ ここが重要：要素があるときだけ実行する
    if (loader) {
        setTimeout(() => {
            loader.classList.add('c-loading--hidden');
            setTimeout(() => { if(hero) hero.classList.add('is-visible'); }, 300);
        }, 2500);
    } else {
        // ローディングがないページでもタイトルだけは出す
        if(hero) hero.classList.add('is-visible');
    }
});
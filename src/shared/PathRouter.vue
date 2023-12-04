<script setup lang="ts">
// import type으로 import 하지 않으면 개발 서버에서 Vite 오류가 남
import { type Component, shallowRef } from "vue";
import NotFoundPage from "./NotFoundPage.vue";

interface Props {
    /**
     * keep-alive로 인스턴스를 캐싱할 이름
     * @see https://ko.vuejs.org/guide/built-ins/keep-alive#include-exclude
     */
    cachedInstanceNamePattern: RegExp;
    pathConfig: {
        path: RegExp;
        component: Component;
    }[];
}

const { pathConfig } = defineProps<Props>();

/**
 * 현재 path에 처음으로 대응되는 컴포넌트를 반환한다.
 *
 * 대응되는 컴포넌트가 없는 경우 `NotFoundPage` 컴포넌트를 반환한다.
 */
const findComponentForPath = () => {
    const { pathname } = window.location;

    const componentFound = pathConfig.find(({ path }) => pathname.match(path));

    if (!componentFound) {
        console.warn(`no component for ${pathname}, fall back to 404`);
        return NotFoundPage;
    }

    return componentFound.component;
};

/* ref 대신 shallowRef를 사용한 이유:
   shallowRef는 참조 타입이지만 기본 타입에 대한 ref 처럼 동작함.
   Component 타입이 바뀔 때 외에는 re-render 필요 없으므로 내부 프로퍼티에 대한 reactivity가 필요 없음.
   참고: https://vuejs.org/api/reactivity-advanced.html#shallowref
*/
const currentComponent = shallowRef<Component | string>(findComponentForPath());

// 뒤로 가기 시 popState 발생
// 스크롤은 자동 복구됨
window.addEventListener("popstate", () => {
    currentComponent.value = findComponentForPath();
});

// goTo 함수 호출 시 pushState 발행 필요
window.addEventListener("goto", (e) => {
    const { href, prevPath, prevScrollX, prevScrollY } = (e as CustomEvent).detail;

    // STEP 1. 기존 페이지의 스크롤 (x, y) 좌표 저장
    sessionStorage.setItem(prevPath, `${prevScrollX},${prevScrollY}`);

    // STEP 2. URL 이동
    history.pushState({}, "", href);
    currentComponent.value = findComponentForPath();

    // STEP 3. 스크롤 복원
    // Vue가 frame 단위로 렌더링하기 때문에 대기 필요
    requestAnimationFrame(() => {
        const prevScroll = sessionStorage.getItem(window.location.pathname);
        if (!prevScroll) {
            return;
        }
        const [scrollX, scrollY] = prevScroll.split(",").map(Number);
        window.scrollTo({
            top: scrollY,
            left: scrollX,
            behavior: "instant",
        });
    });
});
</script>

<template>
    <!-- keep-alive를 사용하면 컴포넌트 인스턴스 하나를 살려 놓은 상태로 공유함(인스턴스 캐싱이라고 함). -->
    <!-- DetailPage -> SearchPage로 이동 시 기존 검색 결과가 보존됨. -->
    <!-- 참고: https://vuejs.org/guide/built-ins/keep-alive.html#keepalive -->
    <keep-alive :include="cachedInstanceNamePattern">
        <component :is="currentComponent"></component>
    </keep-alive>
</template>

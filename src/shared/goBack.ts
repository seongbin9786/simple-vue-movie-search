import { goTo } from "./goTo";

/**
 * 뒤로가기와 동일한 동작을 한다.
 *
 * 뒤로가기를 하는 경우 스크롤이 유지된다. (아마도 Keep Alive에 의해 되는 듯하다.)
 */
export const goBack = () => {
    // 이전 페이지가 없는 경우
    if (window.history.length === 1) {
        goTo("/");
    }

    window.history.back();
};

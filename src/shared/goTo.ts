/**
 * 특정 URL로 이동한다.
 *
 * 해당 URL에 대응되는 컴포넌트가 렌더링된다.
 *
 * @param href 방문 대상 경로
 */
export const goTo = (href: string) => {
    window.dispatchEvent(
        new CustomEvent("goto", {
            detail: {
                href,
                prevPath: window.location.pathname,
                prevScrollX: window.scrollX,
                prevScrollY: window.scrollY,
            },
        }),
    );
};

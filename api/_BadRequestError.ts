// 파일 이름이 _로 시작하면 Serverless Function에서 제외됨
/** 사용자 입력 오류를 표현 */
export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}

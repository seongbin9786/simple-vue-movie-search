// 파일 이름이 _로 시작하면 Serverless Function에서 제외됨
/** 서버 오류를 표현 */
export class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InternalServerError";
    }
}

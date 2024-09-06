import { checkContentType, checkHasToken } from "@/utils/middleware";
import { withSuccessResponse } from "@/utils/response";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    // Content-Type이 application/json이 아닌 경우 400 에러를 반환합니다.
    if (!checkContentType(request)) {
      return new Response(
        JSON.stringify({
          error: "Content-Type은 application/json이어야 합니다.",
        }),
        { status: 400 }
      );
    }

    // 만약 요청에 accessToken이 포함되어 있다면 400 에러를 반환합니다.
    if (checkHasToken(request)) {
      return new Response(
        JSON.stringify({
          error: "이미 로그인되어 있습니다.",
        }),
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          error: "이메일과 비밀번호는 필수로 입력되어야 합니다.",
        }),
        { status: 400 }
      );
    }

    const accessToken = uuidv4();
    const refreshToken = uuidv4();

    const responseData = {
      accessToken,
      refreshToken,
    };

    return withSuccessResponse({ data: responseData, message: "로그인 성공" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

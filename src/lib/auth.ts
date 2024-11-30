// 로그아웃 함수
export async function signOut() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("로그아웃 실패");
    }

    return true;
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    return false;
  }
}

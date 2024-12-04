import { handleClientError } from "@/utils/error-handler";

export async function signOut(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "로그아웃 처리에 실패했습니다.");
    }

    return true;
  } catch (error) {
    console.error(handleClientError(error));
    return false;
  }
}

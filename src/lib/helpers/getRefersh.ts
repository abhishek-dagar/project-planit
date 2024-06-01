export const getRefresh = (ref: string | null) => {
  if (typeof window === "object") {
    const url = window.location.href.replace(/&refresh=[^&]*/g, "");
    const count = parseInt(ref || "0") + 1;
    const questionMark = url.includes("?") ? "" : "?";
    return url + questionMark + "&refresh=" + count;
  }
  return "";
};

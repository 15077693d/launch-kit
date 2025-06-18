"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function isInstagramBrowser() {
  if (typeof navigator === "undefined") return false;
  return /Instagram/i.test(navigator.userAgent);
}

export default function useIsInstgramBrowser() {
  const t = useTranslations();
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    const checkInstagram = () => {
      const _isInstagramBrowser = isInstagramBrowser();
      setIsInstagram(_isInstagramBrowser);
      if (_isInstagramBrowser) {
        alert(t("isInstagramBrowser"));
      } else {
        // 如果不是 Instagram 瀏覽器，返回 true 來停止檢查
        return true;
      }
    };

    // 首次檢查
    if (checkInstagram()) return;

    // 設置定期檢查
    const intervalId = setInterval(() => {
      if (checkInstagram()) {
        clearInterval(intervalId);
      }
    }, 5000);

    // 清理函數
    return () => {
      clearInterval(intervalId);
    };
  }, [t]);

  return isInstagram;
}

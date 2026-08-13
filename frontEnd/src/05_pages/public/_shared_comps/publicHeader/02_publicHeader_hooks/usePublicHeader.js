import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const usePublicHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const handleLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    handlers: {
      handleLogoClick,
    },
    t,
  };
};

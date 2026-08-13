import { useTranslation } from "react-i18next";

export const usePublicFooter = () => {
  const { t } = useTranslation("common");

  return { t };
};

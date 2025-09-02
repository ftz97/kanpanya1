"use client";
import { useTAsync } from "@/i18n/useTAsync";

export default function OffersList() {
  const { t, tn } = useTAsync(["common", "flashOffers"]);
  const count = 1; // ex. data.length

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("flashOffers.title")}</h1>
      <div className="text-sm opacity-70">
        {tn("common.list.offersCount", count)}
      </div>
      
      <div className="grid gap-3 md:grid-cols-3">
        <div className="font-medium">{t("flashOffers.filters.title")}</div>
        <div>{t("flashOffers.filters.byStatus")}</div>
        <div>{t("flashOffers.filters.byDate")}</div>
      </div>

      <div className="rounded-xl border p-4">
        <div className="mb-3 text-sm uppercase opacity-60">
          {t("common.misc.status")} : {t("common.status.active")}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">{t("common.actions.new")}:</span>
            <span className="text-sm font-medium">{t("flashOffers.list.newOffer")}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">{t("common.misc.filters")}:</span>
            <span className="text-sm font-medium">{t("flashOffers.filters.byPrice")}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">{t("common.actions.edit")}:</span>
            <span className="text-sm font-medium">{t("flashOffers.edit.title")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}



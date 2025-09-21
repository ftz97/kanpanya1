"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTAsync } from "@/i18n/useTAsync";

const Schema = z.object({
  title: z.string().min(3),
  description: z.string().default(""),
  starts_at: z.string().min(1),
  ends_at: z.string().min(1),
  price: z.coerce.number().min(0),
  is_active: z.boolean().default(true),
});

type FormData = z.infer<typeof Schema>;

export default function FlashOfferDialog() {
  const { t } = useTAsync(["flashOffers", "common"]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<FormData>({
      resolver: zodResolver(Schema) as unknown,
      defaultValues: {
        title: "",
        description: "",
        starts_at: new Date().toISOString().slice(0, 16), // yyyy-MM-ddTHH:mm
        ends_at: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16), // +1h
        price: 29.99,
        is_active: true,
      },
    });

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      title: data.title,
      description: data.description || null,
      starts_at: new Date(data.starts_at).toISOString(),
      ends_at: new Date(data.ends_at).toISOString(),
      price: data.price,
      is_active: data.is_active,
    };
    
    const res = await fetch("/api/flash-offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json?.ok) {
      return toast.error(typeof json?.error === "string" ? json.error : t("flashOffers.new.createdErr"));
    }
    toast.success(t("flashOffers.new.createdOk"));
    setOpen(false);
    reset();
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="btn btn-primary">+ {t("flashOffers.new.create")}</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("flashOffers.new.create")}</DialogTitle>
          <DialogDescription>{t("flashOffers.new.description")}</DialogDescription>
        </DialogHeader>

        <form className="grid gap-3" onSubmit={onSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="title">{t("flashOffers.new.titleLabel")}</Label>
            <Input id="title" placeholder={t("flashOffers.new.titlePlaceholder")} {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="description">{t("flashOffers.new.descriptionLabel")}</Label>
            <Input id="description" placeholder={t("flashOffers.new.descriptionPlaceholder")} {...register("description")} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <Label htmlFor="starts_at">{t("flashOffers.new.startsAt")}</Label>
              <Input id="starts_at" type="datetime-local" {...register("starts_at")} />
              {errors.starts_at && <p className="text-sm text-red-500">{errors.starts_at.message}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="ends_at">{t("flashOffers.new.endsAt")}</Label>
              <Input id="ends_at" type="datetime-local" {...register("ends_at")} />
              {errors.ends_at && <p className="text-sm text-red-500">{errors.ends_at.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <Label htmlFor="price">{t("flashOffers.new.price")}</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="is_active">{t("flashOffers.new.isActive")}</Label>
              <Input id="is_active" type="checkbox" {...register("is_active")} />
              {errors.is_active && <p className="text-sm text-red-500">{errors.is_active.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button className="btn btn-outline" type="button" onClick={() => setOpen(false)}>{t("flashOffers.new.cancel")}</button>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>{t("flashOffers.new.validate")}</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

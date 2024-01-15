"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import React, { ChangeEvent } from "react";

export default function SwitchForm({
  checked,
  onToggle,
  name,
}: {
  checked: boolean;
  onToggle: () => Promise<string>;
  name: string;
}) {
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = JSON.parse(await onToggle());
    if (!error) {
      toast({
        title: `Successfully update ${name} 🎉`,
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Switch checked={checked} type="submit" />
    </form>
  );
}

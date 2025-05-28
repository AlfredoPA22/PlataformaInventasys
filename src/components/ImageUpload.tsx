import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ImageUploadProps {
  label: string;
  name: string;
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ label, name, value, onChange }: ImageUploadProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };

  return (
    <div className="space-y-1 m-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        accept="image/*"
        id={name}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;

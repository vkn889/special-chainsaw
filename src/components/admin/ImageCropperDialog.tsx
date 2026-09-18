"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { Dialog } from "@base-ui/react/dialog";
import { cropImageToBlob } from "@/lib/cropImage";

export default function ImageCropperDialog({
  imageUrl,
  aspect,
  onCancel,
  onCropped,
}: {
  /** The raw, uncropped image to crop. The dialog is open whenever this is
   *  non-null. */
  imageUrl: string | null;
  aspect: number;
  onCancel: () => void;
  onCropped: (blob: Blob) => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleApply() {
    if (!imageUrl || !croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await cropImageToBlob(imageUrl, croppedAreaPixels);
      onCropped(blob);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Dialog.Root
      open={Boolean(imageUrl)}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[61] w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-deep-2 p-6 shadow-2xl">
          <Dialog.Title className="text-gold text-xs tracking-[0.35em] uppercase mb-4">
            ✦ Crop Photo
          </Dialog.Title>

          <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-xl bg-deep">
            {imageUrl && (
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            )}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted">
              Zoom
            </span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-gold"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-cream/25 px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={processing || !croppedAreaPixels}
              className="rounded-full bg-violet px-6 py-2.5 text-xs tracking-[0.15em] uppercase text-cream transition-colors hover:bg-gold hover:text-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing ? "Cropping…" : "Apply Crop"}
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

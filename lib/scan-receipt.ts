import { Receipt } from "@/types/receipt-type";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

export async function scanReceipt(uri: string): Promise<Receipt> {
  const manipulateImage = ImageManipulator.manipulate(uri).resize({
    width: 1000,
  });
  const rendered = await manipulateImage.renderAsync();
  const finalImage = await rendered.saveAsync({
    base64: true,
    compress: 0.7,
    format: SaveFormat.JPEG,
  });

  const dataURL = `data:image/jpeg;base64,${finalImage.base64}`;

  const res = await fetch(
    "https://receipt-scanner-api-phi.vercel.app/api/scan",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: dataURL }),
    },
  );
  const data = await res.json();
  return data.receipt;
}

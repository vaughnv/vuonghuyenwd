// Single source of truth for the photo album (Gallery section).
//
// Cách thêm ảnh:
//   1. Thả ảnh vào public/images/album/
//   2. Thêm entry mới vào mảng albumPhotos bên dưới với src trỏ tới đúng file WebP
//   Album tự hiện lưới ảnh + lightbox khi mảng có >= 1 phần tử.

export const albumTitle = "Khoảnh khắc của chúng tôi";

export interface AlbumPhoto {
  /** Đường dẫn ảnh trong /public. */
  src: string;
  /** Mô tả ảnh (alt + chú thích lightbox). */
  alt: string;
}

export const albumPhotos: AlbumPhoto[] = [
  { src: "/images/album/PMN07869.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 1" },
  { src: "/images/album/PMN08732.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 2" },
  { src: "/images/album/PMN09308.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 3" },
  { src: "/images/album/PMN07469.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 4" },
  { src: "/images/album/PMN08663.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 5" },
  { src: "/images/album/PMN09157.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 6" },
  { src: "/images/album/cr.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 7" },
  { src: "/images/album/PMN07283.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 8" },
  { src: "/images/album/PMN07376.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 9" },
  { src: "/images/album/PMN07415.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 10" },
  { src: "/images/album/PMN07431.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 11" },
  { src: "/images/album/PMN07486.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 12" },
  { src: "/images/album/PMN07569.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 13" },
  { src: "/images/album/PMN07763.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 14" },
  { src: "/images/album/PMN07781.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 15" },
  { src: "/images/album/PMN07985.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 16" },
  { src: "/images/album/PMN08185_2_crop.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 17" },
  { src: "/images/album/PMN08185_2.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 18" },
  { src: "/images/album/PMN08295.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 19" },
  { src: "/images/album/PMN08328.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 20" },
  { src: "/images/album/PMN08329.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 21" },
  { src: "/images/album/PMN08436.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 22" },
  { src: "/images/album/PMN08441.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 23" },
  { src: "/images/album/PMN08518.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 24" },
  { src: "/images/album/PMN08617.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 25" },
  { src: "/images/album/PMN08646.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 26" },
  { src: "/images/album/PMN08688.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 27" },
  { src: "/images/album/PMN08712.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 28" },
  { src: "/images/album/PMN08737.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 29" },
  { src: "/images/album/PMN08758.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 30" },
  { src: "/images/album/PMN08781.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 31" },
  { src: "/images/album/PMN08791.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 32" },
  { src: "/images/album/PMN08806.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 33" },
  { src: "/images/album/PMN08808.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 34" },
  { src: "/images/album/PMN08816.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 35" },
  { src: "/images/album/PMN08846.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 36" },
  { src: "/images/album/PMN08872_ghep_mieng.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 37" },
  { src: "/images/album/PMN08872.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 38" },
  { src: "/images/album/PMN09072.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 39" },
  { src: "/images/album/PMN09088.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 40" },
  { src: "/images/album/PMN09095.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 41" },
  { src: "/images/album/PMN09140.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 42" },
  { src: "/images/album/PMN09224.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 43" },
  { src: "/images/album/PMN09241.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 44" },
  { src: "/images/album/PMN09465.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 45" },
  { src: "/images/album/PMN09467.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 46" },
  { src: "/images/album/PMN09585.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 47" },
  { src: "/images/album/PMN09692.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 48" },
  { src: "/images/album/PMN09723.webp", alt: "Ảnh cưới Hùng Vương & Thu Huyền 49" },
];

// Single source of truth for all wedding content.
// Edit here and every section (Hero, WeddingInfo, Calendar, Timeline, SaveToCalendar) stays in sync.

export interface WeddingEvent {
  id: string;
  name: string;
  side: "groom" | "bride" | null;
  /** Display time, e.g. "08:15". */
  time: string;
  /** Display date, e.g. "07.08.2026". */
  dateLabel: string;
  /** Vietnamese weekday, e.g. "Thứ Sáu". */
  weekday: string;
  /** Optional lunar date note. */
  lunar?: string;
  /** ISO local start, e.g. "2026-08-07T08:15:00" (Asia/Ho_Chi_Minh). */
  start: string;
  /** Event length in hours (for calendar end time). */
  durationHours: number;
  /** Venue label, e.g. "Tư gia nhà gái". */
  venue: string;
  address: string;
}

export const couple = {
  groom: { name: "Hùng Vương", role: "Chú rể", initial: "V" },
  bride: { name: "Thu Huyền", role: "Cô dâu", initial: "H" },
  /** Main wedding date shown in the hero. */
  dateLabel: "09.08.2026",
  hero: {
    eyebrow: "Save our date",
    quote: "When two hearts beat as one",
    subQuote: "They create a soul strong enough to last forever",
  },
} as const;

export interface ParentInfo {
  label: string;
  father: string;
  mother: string;
  child: string;
  address: string;
}

export const parents: { groom: ParentInfo; bride: ParentInfo } = {
  groom: {
    label: "Nhà trai",
    father: "Ông: Nguyễn Văn Lĩnh",
    mother: "Bà: Trần Thị Thương",
    child: "Chú rể: Hùng Vương",
    address: "Số 601 đường 512B, Thôn Thái Tượng, Xã Tượng Lĩnh, Tỉnh Thanh Hoá",
  },
  bride: {
    label: "Nhà gái",
    father: "Ông: Nguyễn Văn Tấn",
    mother: "Bà: Nguyễn Thị Nga",
    child: "Cô dâu: Thu Huyền",
    address: "Số 463 đường 512B, Thôn Cát Vinh, Xã Tượng Lĩnh, Tỉnh Thanh Hoá",
  },
};

// Full day-by-day schedule (as provided). Timeline renders all; WeddingInfo highlights the two ceremonies.
export const events: WeddingEvent[] = [
  {
    id: "vu-quy",
    name: "Lễ Vu Quy",
    side: "bride",
    time: "08:15",
    dateLabel: "07.08.2026",
    weekday: "Thứ Sáu",
    lunar: "Tức ngày 25 tháng 06 năm Bính Ngọ",
    start: "2026-08-07T08:15:00",
    durationHours: 3,
    venue: "Tư gia nhà gái",
    address: "463 đường 512B, Tượng Lĩnh, Thanh Hoá",
  },
  {
    id: "tiec-nha-trai",
    name: "Tiệc nhà trai",
    side: "groom",
    time: "16:30",
    dateLabel: "08.08.2026",
    weekday: "Thứ Bảy",
    start: "2026-08-08T16:30:00",
    durationHours: 3,
    venue: "Tư gia nhà trai",
    address: "601 đường 512B, Tượng Lĩnh, Thanh Hoá",
  },
  {
    id: "tiec-nha-gai",
    name: "Tiệc nhà gái",
    side: "bride",
    time: "16:30",
    dateLabel: "08.08.2026",
    weekday: "Thứ Bảy",
    start: "2026-08-08T16:30:00",
    durationHours: 3,
    venue: "Tư gia nhà gái",
    address: "463 đường 512B, Tượng Lĩnh, Thanh Hoá",
  },
  {
    id: "thanh-hon",
    name: "Lễ Thành Hôn",
    side: "groom",
    time: "08:15",
    dateLabel: "09.08.2026",
    weekday: "Chủ Nhật",
    lunar: "Tức ngày 27 tháng 06 năm Bính Ngọ",
    start: "2026-08-09T08:15:00",
    durationHours: 3,
    venue: "Tư gia nhà trai",
    address: "601 đường 512B, Tượng Lĩnh, Thanh Hoá",
  },
];

/** The headline ceremony used for the countdown + primary calendar button. */
export const mainEvent: WeddingEvent = events[events.length - 1];

/** Calendar month view config. */
export const calendar = {
  year: 2026,
  monthLabel: "August",
  monthIndex: 7, // 0-based (August)
  /** Days to mark with a heart. */
  highlightDays: [7, 8, 9],
} as const;

// Lời tâm thư gửi khách mời (hiển thị ở mục "Tâm thư").
export const letter = {
  eyebrow: "Tâm thư",
  title: "Chuyện chúng mình",
  greeting: "Thân gửi anh chị và bạn bè thân mến,",
  paragraphs: [
    "Hành trình của chúng em bắt đầu từ những năm tháng trong trẻo nhất của tuổi học trò, khi cả hai vẫn còn là những cô cậu học sinh lớp 9. Qua những ngày tháng học trò, đại học rồi những bước đầu trưởng thành, chúng em đã cùng lớn lên, cùng thay đổi và cùng học cách yêu thương nhau nhiều hơn.",
    "Gần một thập kỷ trôi qua, có rất nhiều điều đã khác. Chỉ có một điều vẫn vẹn nguyên, đó là người bên cạnh vẫn là người mà chúng em muốn nắm tay đi tiếp.",
    "Bước sang năm 2026, chúng em chọn về chung một nhà, khép lại chặng đường thanh xuân đã cùng nhau đi qua và mở ra một hành trình mới, nơi cả hai tiếp tục yêu thương, thấu hiểu và cùng nhau vun đắp cho mái ấm của mình.",
    "Chúng em rất mong được đón anh chị và bạn bè đến chung vui, chứng kiến và gửi lời chúc phúc cho ngày đặc biệt này.",
  ],
  signOff: "Thương mến,",
} as const;

// Địa điểm cho phần "Chỉ đường".
// mapUrl = link Google Maps chính xác (mở khi bấm nút); embed = "lat,lng" để nhúng bản đồ.
export const venues = {
  groom: {
    label: "Nhà trai",
    name: "Tư gia nhà trai",
    address: parents.groom.address,
    mapUrl: "https://maps.app.goo.gl/Sk3mpUUvRao9K3JM7",
    embed: "19.543557,105.707515",
  },
  bride: {
    label: "Nhà gái",
    name: "Tư gia nhà gái",
    address: parents.bride.address,
    mapUrl: "https://maps.app.goo.gl/6a3ETxeqxwxDoDWX9",
    embed: "19.549095,105.706956",
  },
} as const;

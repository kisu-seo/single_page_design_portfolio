# 스타일 가이드 (Style Guide)

이 파일은 프로젝트(Project)에서 사용되는 디자인 시스템(Design System)의 색상, 타이포그래피(Typography - 서체), 테두리 반경(Border Radius - 테두리 곡률), 그리고 간격(Spacing - 여백) 정보를 정리한 문서입니다.

## 색상 가이드 (Colors Guide)

### 무채색 (Neutral)

| 이름 (Name - 이름) | HEX (Hexadecimal - 16진수 색상 코드) | RGB (Red Green Blue - 삼원색 광원 방식) | HSL (Hue Saturation Lightness - 색상 채도 명도) |
| :--- | :--- | :--- | :--- |
| **Neutral 900** | `#030303` | `3, 3, 3` | `0, 0%, 1%` |
| **Neutral 400** | `#6A6662` | `106, 102, 98` | `30, 4%, 40%` |
| **Neutral 200** | `#FFF7F0` | `255, 247, 240` | `28, 100%, 97%` |
| **Neutral 0** | **Neutral 0** | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` |

*참고: 무채색 표의 Neutral 0 행의 이름 열에 Neutral 0이 한 번 더 기입된 것은 이미지상 표현과 일치하기 위함입니다.*

### 주요 색상 (Colors)

| 이름 (Name - 이름) | HEX (Hexadecimal - 16진수 색상 코드) | RGB (Red Green Blue - 삼원색 광원 방식) | HSL (Hue Saturation Lightness - 색상 채도 명도) |
| :--- | :--- | :--- | :--- |
| **Light Red 500** | `#E16B5B` | `225, 107, 91` | `7, 69%, 62%` |
| **Galactic Blue 500** | `#755CDE` | `117, 92, 222` | `252, 66%, 62%` |
| **Summer Yellow 500** | `#F6A560` | `246, 165, 96` | `28, 89%, 67%` |
| **Pink 500** | `#F39E9E` | `243, 158, 158` | `0, 78%, 79%` |
| **Cyan 500** | `#61C4B7` | `97, 196, 183` | `172, 46%, 57%` |
| **Dark Purple 500** | `#552049` | `85, 32, 73` | `314, 45%, 23%` |

---

## CSS 색상 변수 (CSS Color Variables - CSS 색상 변수)

```css
/* === Color System / 색상 시스템 === */
:root {
  /* Neutral (무채색) */
  --color-neutral-900: #030303; /* RGB: 3, 3, 3 / HSL: 0, 0%, 1% */
  --color-neutral-400: #6A6662; /* RGB: 106, 102, 98 / HSL: 30, 4%, 40% */
  --color-neutral-200: #FFF7F0; /* RGB: 255, 247, 240 / HSL: 28, 100%, 97% */
  --color-neutral-0: #FFFFFF;   /* RGB: 255, 255, 255 / HSL: 0, 0%, 100% */

  /* Colors (주요 색상) */
  --color-light-red-500: #E16B5B;      /* RGB: 225, 107, 91 / HSL: 7, 69%, 62% */
  --color-galactic-blue-500: #755CDE;  /* RGB: 117, 92, 222 / HSL: 252, 66%, 62% */
  --color-summer-yellow-500: #F6A560;  /* RGB: 246, 165, 96 / HSL: 28, 89%, 67% */
  --color-pink-500: #F39E9E;           /* RGB: 243, 158, 158 / HSL: 0, 78%, 79% */
  --color-cyan-500: #61C4B7;           /* RGB: 97, 196, 183 / HSL: 172, 46%, 57% */
  --color-dark-purple-500: #552049;     /* RGB: 85, 32, 73 / HSL: 314, 45%, 23% */
}
```

---

## 타이포그래피 가이드 (Typography Guide - 서체 가이드)

### 본문 및 제목 글꼴 (Font Family - 글꼴 서체)
- **Plus Jakarta Sans** (Google Fonts - 구글 글꼴 서비스)
  - Medium (500 - 중간 굵기)
  - Bold (700 - 굵은 굵기)

### 타이포그래피 프리셋 (Typography Presets - 서체 설정값)

| 프리셋 이름 (Preset Name) | 글꼴 패밀리 (Font Family) | 두께 (Weight) | 크기 (Size) | 줄 간격 (Line Height) | 자간 (Letter Spacing) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Text Preset 1** | `Plus Jakarta Sans` | Bold (`700`) | `56px` | `130%` (또는 `72.8px`) | `0px` |
| **Text Preset 1 (Mobile - 모바일)** | `Plus Jakarta Sans` | Bold (`700`) | `40px` | `120%` (또는 `48px`) | `0px` |
| **Text Preset 2** | `Plus Jakarta Sans` | Bold (`700`) | `40px` | `130%` (또는 `52px`) | `0px` |
| **Text Preset 3** | `Plus Jakarta Sans` | Bold (`700`) | `24px` | `130%` (또는 `31.2px`) | `0px` |
| **Text Preset 4** | `Plus Jakarta Sans` | Medium (`500`) | `18px` | `150%` (또는 `27px`) | `0px` |
| **Text Preset 5** | `Plus Jakarta Sans` | Bold (`700`) | `16px` | `150%` (또는 `24px`) | `0px` |

---

## CSS 타이포그래피 클래스 (CSS Typography Classes - CSS 서체 클래스)

```css
/* === Typography System / 타이포그래피 시스템 === */
.text-preset-1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 3.5rem; /* 56px */
  font-weight: 700;
  line-height: 1.3; /* 130% */
  letter-spacing: 0;
}

@media (max-width: 768px) {
  .text-preset-1 {
    font-size: 2.5rem; /* 40px */
    line-height: 1.2; /* 120% */
  }
}

.text-preset-2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2.5rem; /* 40px */
  font-weight: 700;
  line-height: 1.3; /* 130% */
  letter-spacing: 0;
}

.text-preset-3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.3; /* 130% */
  letter-spacing: 0;
}

.text-preset-4 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem; /* 18px */
  font-weight: 500;
  line-height: 1.5; /* 150% */
  letter-spacing: 0;
}

.text-preset-5 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem; /* 16px */
  font-weight: 700;
  line-height: 1.5; /* 150% */
  letter-spacing: 0;
}
```

---

## 테두리 반경 가이드 (Border Radius Guide - 테두리 반경 가이드)

### 테두리 반경 값 (Border Radius Values - 테두리 반경 값)

| 이름 (Name - 이름) | 픽셀 값 (Pixels - 픽셀 값) |
| :--- | :--- |
| **radius-0** | `0` (또는 `0px`) |
| **radius-4** | `4px` |
| **radius-6** | `6px` |
| **radius-8** | `8px` |
| **radius-10** | `10px` |
| **radius-12** | `12px` |
| **radius-16** | `16px` |
| **radius-20** | `20px` |
| **radius-24** | `24px` |
| **radius-full** | `999px` |

---

## CSS 테두리 반경 변수 (CSS Border Radius Variables - CSS 테두리 반경 변수)

```css
/* === Border Radius System / 테두리 반경 시스템 === */
:root {
  --radius-0: 0px;
  --radius-4: 4px;
  --radius-6: 6px;
  --radius-8: 8px;
  --radius-10: 10px;
  --radius-12: 12px;
  --radius-16: 16px;
  --radius-20: 20px;
  --radius-24: 24px;
  --radius-full: 999px;
}
```

---

## 간격 가이드 (Spacing Guide - 간격 가이드)

### 간격 값 (Spacing Values - 간격 값)

| 이름 (Name - 이름) | 픽셀 값 (Pixels - 픽셀 값) |
| :--- | :--- |
| **spacing-0** | `0` (또는 `0px`) |
| **spacing-025** | `2px` |
| **spacing-050** | `4px` |
| **spacing-075** | `6px` |
| **spacing-100** | `8px` |
| **spacing-150** | `12px` |
| **spacing-200** | `16px` |
| **spacing-250** | `20px` |
| **spacing-300** | `24px` |
| **spacing-400** | `32px` |
| **spacing-500** | `40px` |
| **spacing-600** | `48px` |
| **spacing-800** | `64px` |
| **spacing-1000** | `80px` |

---

## CSS 간격 변수 (CSS Spacing Variables - CSS 간격 변수)

```css
/* === Spacing System / 간격 시스템 === */
:root {
  --spacing-0: 0px;
  --spacing-025: 2px;
  --spacing-050: 4px;
  --spacing-075: 6px;
  --spacing-100: 8px;
  --spacing-150: 12px;
  --spacing-200: 16px;
  --spacing-250: 20px;
  --spacing-300: 24px;
  --spacing-400: 32px;
  --spacing-500: 40px;
  --spacing-600: 48px;
  --spacing-800: 64px;
  --spacing-1000: 80px;
}
```

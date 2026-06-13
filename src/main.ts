import './index.css';

// --- Slider Interface & Interaction ---
// 슬라이더 인터랙션 및 키보드/마우스 스크롤 제어 로직

const slider = document.getElementById('portfolio-slider') as HTMLDivElement | null;
const btnPrev = document.getElementById('btn-prev') as HTMLButtonElement | null;
const btnNext = document.getElementById('btn-next') as HTMLButtonElement | null;

if (slider && btnPrev && btnNext) {
  // 스크롤 이동에 필요한 1회 이동 단위 계산 함수
  const getScrollAmount = (): number => {
    const firstSlide = slider.firstElementChild as HTMLElement | null;
    if (firstSlide) {
      // 슬라이드 카드의 실제 너비 + gap(32px)을 기준으로 이동 거리 책정
      return firstSlide.clientWidth + 32;
    }
    return 300; // 기본 폴백 이동 거리
  };

  // 이전/다음 버튼 상태 제어 (비활성화 처리)
  const updateButtonState = (): void => {
    const tolerance = 5; // 소수점 오차 보정을 위한 허용 범위 (px)
    const isAtStart = slider.scrollLeft <= tolerance;
    const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - tolerance;

    btnPrev.disabled = isAtStart;
    btnNext.disabled = isAtEnd;

    // 스크린 리더용 aria-disabled 상태 동기화
    btnPrev.setAttribute('aria-disabled', isAtStart.toString());
    btnNext.setAttribute('aria-disabled', isAtEnd.toString());
  };

  // 슬라이더 수동 스크롤 조작 함수
  const scrollSlider = (direction: 'prev' | 'next'): void => {
    const amount = getScrollAmount();
    const targetScrollLeft = direction === 'prev' 
      ? slider.scrollLeft - amount 
      : slider.scrollLeft + amount;

    slider.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  };

  // 마우스 드래그 스크롤 인터랙션
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  slider.addEventListener('mousedown', (e: MouseEvent) => {
    isDown = true;
    slider.classList.add('grabbing');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('grabbing');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('grabbing');
  });

  slider.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // 스크롤 속도 조절 배율
    slider.scrollLeft = scrollLeft - walk;
  });

  // 키보드 접근성: 포커스 상태에서 방향키 제어
  slider.tabIndex = 0; // 슬라이더 자체를 키보드 탭 대상으로 설정
  slider.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollSlider('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollSlider('next');
    }
  });

  // 이전/다음 버튼 클릭 이벤트 바인딩
  btnPrev.addEventListener('click', () => scrollSlider('prev'));
  btnNext.addEventListener('click', () => scrollSlider('next'));

  // 스크롤 이벤트 감지를 통한 버튼 상태 실시간 갱신
  slider.addEventListener('scroll', updateButtonState);

  // 초기 실행 시 버튼 상태 검사 및 세팅
  updateButtonState();

  // 창 크기 변경 시 슬라이더 포지션 재계산에 따른 버튼 갱신
  window.addEventListener('resize', updateButtonState);
}
